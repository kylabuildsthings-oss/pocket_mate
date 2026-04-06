import type { PocketMateMode } from "@/store/mode/useModeStore";

export type TradeSurface = "swap" | "stake" | "liquidity";

export type TradeReceipt = {
  id: string;
  surface: TradeSurface;
  createdAt: number;
  mode: PocketMateMode;
  /** Live uses wallet read-only context; execution is still simulated in MVP */
  dataContext: "demo-sim" | "live-read-sim";
  summary: string;
  amountIn: string;
  amountOut: string;
  tokenIn: string;
  tokenOut: string;
  /** Deterministic pseudo-hash for receipts */
  receiptHash: string;
};
