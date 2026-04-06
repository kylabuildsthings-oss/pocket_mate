import type { PocketMateMode } from "@/store/mode/useModeStore";
import type { TradeReceipt } from "./types";

function fnv1aHex(input: string): string {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const n = h >>> 0;
  const core = n.toString(16).padStart(8, "0");
  return (core + core + core + core + core + core + core + core).slice(0, 64);
}

export function makeReceiptHash(
  parts: Record<string, string | number>
): string {
  const canonical = Object.keys(parts)
    .sort()
    .map((k) => `${k}=${parts[k]}`)
    .join("|");
  return `0x${fnv1aHex(canonical)}`;
}

function round6(n: number): number {
  return Math.round(n * 1e6) / 1e6;
}

export function buildReceipt(
  base: Omit<TradeReceipt, "receiptHash" | "id"> & { nonce: number }
): TradeReceipt {
  const { nonce, ...rest } = base;
  const receiptHash = makeReceiptHash({
    surface: base.surface,
    mode: base.mode,
    context: base.dataContext,
    tokenIn: base.tokenIn,
    tokenOut: base.tokenOut,
    amountIn: base.amountIn,
    amountOut: base.amountOut,
    createdAt: base.createdAt,
    nonce,
  });
  const id = receiptHash.slice(0, 18);
  return { ...rest, id, receiptHash };
}

/** Deterministic swap output for MVP (constant reference price). */
export function quoteSwap(
  amountIn: number,
  tokenIn: "ETH" | "USDC",
  ethUsd: number
): { amountOut: number; tokenOut: "ETH" | "USDC" } {
  if (!Number.isFinite(amountIn) || amountIn <= 0) {
    return { amountOut: 0, tokenOut: tokenIn === "ETH" ? "USDC" : "ETH" };
  }
  if (tokenIn === "ETH") {
    return { amountOut: round6(amountIn * ethUsd), tokenOut: "USDC" };
  }
  return { amountOut: round6(amountIn / ethUsd), tokenOut: "ETH" };
}

export function simulateSwap(params: {
  amountIn: number;
  tokenIn: "ETH" | "USDC";
  ethUsd: number;
  mode: PocketMateMode;
  nonce: number;
}): TradeReceipt {
  const { amountOut, tokenOut } = quoteSwap(
    params.amountIn,
    params.tokenIn,
    params.ethUsd
  );
  const createdAt = Date.now();
  const dataContext = params.mode === "live" ? "live-read-sim" : "demo-sim";
  const summary =
    params.mode === "live"
      ? "Simulated swap (MVP) using live reference prices + wallet context — no chain transaction sent."
      : "Simulated swap — demo balances updated.";
  return buildReceipt({
    surface: "swap",
    createdAt,
    mode: params.mode,
    dataContext,
    summary,
    amountIn: String(params.amountIn),
    amountOut: String(amountOut),
    tokenIn: params.tokenIn,
    tokenOut,
    nonce: params.nonce,
  });
}

export function simulateStake(params: {
  ethAmount: number;
  mode: PocketMateMode;
  nonce: number;
}): TradeReceipt {
  const createdAt = Date.now();
  const dataContext = params.mode === "live" ? "live-read-sim" : "demo-sim";
  return buildReceipt({
    surface: "stake",
    createdAt,
    mode: params.mode,
    dataContext,
    summary:
      params.mode === "live"
        ? "Simulated staking flow — balances unchanged on-chain; practice receipt only."
        : "Simulated stake — demo ETH moved to staked bucket (display only).",
    amountIn: `${params.ethAmount} ETH`,
    amountOut: `${round6(params.ethAmount * 0.042)} pmETH`,
    tokenIn: "ETH",
    tokenOut: "pmETH",
    nonce: params.nonce,
  });
}

export function simulateLiquidity(params: {
  ethAmount: number;
  usdcAmount: number;
  mode: PocketMateMode;
  nonce: number;
}): TradeReceipt {
  const createdAt = Date.now();
  const dataContext = params.mode === "live" ? "live-read-sim" : "demo-sim";
  const lp = round6(Math.sqrt(params.ethAmount * params.usdcAmount));
  return buildReceipt({
    surface: "liquidity",
    createdAt,
    mode: params.mode,
    dataContext,
    summary:
      params.mode === "live"
        ? "Simulated add-liquidity — no pool contract called in MVP."
        : "Simulated liquidity add — demo ETH/USDC debited, LP units credited (display only).",
    amountIn: `${params.ethAmount} ETH + ${params.usdcAmount} USDC`,
    amountOut: `${lp} PM-LP`,
    tokenIn: "ETH+USDC",
    tokenOut: "PM-LP",
    nonce: params.nonce,
  });
}
