"use client";

import {
  quoteSwap,
  simulateLiquidity,
  simulateStake,
  simulateSwap,
} from "@/lib/trade/simEngine";
import type { TradeReceipt } from "@/lib/trade/types";
import type { PocketMateMode } from "@/store/mode/useModeStore";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const STORAGE_KEY = "pocketmate-trade-v1";

type DemoBalances = {
  eth: number;
  usdc: number;
  stakedEth: number;
  lpUnits: number;
};

type TradeState = {
  nonce: number;
  demo: DemoBalances;
  history: TradeReceipt[];
  topUpDemoUsdc: (amount: number) => void;
  resetTrade: () => void;
  runSwap: (
    mode: PocketMateMode,
    amountIn: number,
    tokenIn: "ETH" | "USDC",
    ethUsd: number
  ) => TradeReceipt | null;
  runStake: (mode: PocketMateMode, ethAmount: number) => TradeReceipt | null;
  runLiquidity: (
    mode: PocketMateMode,
    ethAmount: number,
    usdcAmount: number
  ) => TradeReceipt | null;
};

const initialDemo: DemoBalances = {
  eth: 2,
  usdc: 5000,
  stakedEth: 0,
  lpUnits: 0,
};

export const useTradeStore = create<TradeState>()(
  persist(
    (set, get) => ({
      nonce: 0,
      demo: { ...initialDemo },
      history: [],

      topUpDemoUsdc: (amount) => {
        if (amount <= 0) return;
        set((s) => ({
          demo: { ...s.demo, usdc: round6(s.demo.usdc + amount) },
        }));
      },

      resetTrade: () =>
        set({
          nonce: 0,
          demo: { ...initialDemo },
          history: [],
        }),

      runSwap: (mode, amountIn, tokenIn, ethUsd) => {
        if (!Number.isFinite(amountIn) || amountIn <= 0) return null;
        const { amountOut } = quoteSwap(amountIn, tokenIn, ethUsd);

        if (mode === "demo") {
          const d = get().demo;
          if (tokenIn === "ETH" && d.eth < amountIn) return null;
          if (tokenIn === "USDC" && d.usdc < amountIn) return null;
        }

        const nonce = get().nonce + 1;
        const receipt = simulateSwap({
          amountIn,
          tokenIn,
          ethUsd,
          mode,
          nonce,
        });

        set((s) => {
          let demo = { ...s.demo };
          if (mode === "demo") {
            if (tokenIn === "ETH") {
              demo.eth = round6(demo.eth - amountIn);
              demo.usdc = round6(demo.usdc + amountOut);
            } else {
              demo.usdc = round6(demo.usdc - amountIn);
              demo.eth = round6(demo.eth + amountOut);
            }
          }
          return {
            demo,
            nonce,
            history: [receipt, ...s.history].slice(0, 80),
          };
        });

        return receipt;
      },

      runStake: (mode, ethAmount) => {
        if (!Number.isFinite(ethAmount) || ethAmount <= 0) return null;
        if (mode === "demo" && get().demo.eth < ethAmount) return null;

        const nonce = get().nonce + 1;
        const receipt = simulateStake({ ethAmount, mode, nonce });

        set((s) => {
          let demo = { ...s.demo };
          if (mode === "demo") {
            demo.eth = round6(demo.eth - ethAmount);
            demo.stakedEth = round6(demo.stakedEth + ethAmount);
          }
          return {
            demo,
            nonce,
            history: [receipt, ...s.history].slice(0, 80),
          };
        });

        return receipt;
      },

      runLiquidity: (mode, ethAmount, usdcAmount) => {
        if (!Number.isFinite(ethAmount) || ethAmount <= 0) return null;
        if (!Number.isFinite(usdcAmount) || usdcAmount <= 0) return null;
        const d = get().demo;
        if (mode === "demo" && (d.eth < ethAmount || d.usdc < usdcAmount))
          return null;

        const nonce = get().nonce + 1;
        const receipt = simulateLiquidity({
          ethAmount,
          usdcAmount,
          mode,
          nonce,
        });

        set((s) => {
          let demo = { ...s.demo };
          if (mode === "demo") {
            const lp = round6(Math.sqrt(ethAmount * usdcAmount));
            demo.eth = round6(demo.eth - ethAmount);
            demo.usdc = round6(demo.usdc - usdcAmount);
            demo.lpUnits = round6(demo.lpUnits + lp);
          }
          return {
            demo,
            nonce,
            history: [receipt, ...s.history].slice(0, 80),
          };
        });

        return receipt;
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        nonce: s.nonce,
        demo: s.demo,
        history: s.history,
      }),
    }
  )
);

function round6(n: number): number {
  return Math.round(n * 1e6) / 1e6;
}
