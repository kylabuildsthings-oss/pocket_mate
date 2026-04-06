import type { BacktestRequest, BacktestResult } from "./types";

function hashToSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Deterministic mock backtest — same inputs always yield the same curve and metrics. */
export function runMockBacktest(req: BacktestRequest): BacktestResult {
  const key = `${req.templateId}|${req.strategyName}|${req.risk}|${req.timeframe}`;
  const rnd = mulberry32(hashToSeed(key));

  const riskBias = req.risk === "low" ? 0.85 : req.risk === "high" ? 1.15 : 1;
  const winRatePct = round2(Math.min(78, 42 + rnd() * 20 * riskBias));
  const sharpe = round2(0.6 + rnd() * 2.2 * (req.risk === "low" ? 0.9 : 1));
  const totalReturnPct = round2(
    -4 + rnd() * 32 * riskBias * (0.9 + rnd() * 0.2)
  );
  const maxDrawdownPct = round2(
    6 + rnd() * 22 * (req.risk === "high" ? 1.1 : 0.95)
  );
  const trades = Math.max(12, Math.floor(40 + rnd() * 120));

  const points = 56;
  const equityCurve: number[] = [];
  let v = 0.5;
  for (let i = 0; i < points; i += 1) {
    const drift = (totalReturnPct / 100 / points) * (0.8 + rnd() * 0.4);
    const noise = (rnd() - 0.48) * 0.04 * riskBias;
    v = Math.min(1, Math.max(0, v + drift + noise));
    equityCurve.push(round2(v));
  }

  const max = Math.max(...equityCurve, 1e-6);
  const normalized = equityCurve.map((x) => round2(x / max));

  return {
    templateId: req.templateId,
    strategyName: req.strategyName,
    risk: req.risk,
    timeframe: req.timeframe,
    winRatePct,
    sharpe,
    totalReturnPct,
    maxDrawdownPct,
    trades,
    equityCurve: normalized,
    engine: "pocketmate-mock-v1",
    computedAt: Date.now(),
  };
}
