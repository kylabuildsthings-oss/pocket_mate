export type StrategyTemplate = {
  id: string;
  name: string;
  description: string;
  assetHint: string;
};

export type BacktestRequest = {
  templateId: string;
  strategyName: string;
  risk: "low" | "med" | "high";
  timeframe: string;
};

export type BacktestResult = {
  templateId: string;
  strategyName: string;
  risk: string;
  timeframe: string;
  winRatePct: number;
  sharpe: number;
  totalReturnPct: number;
  maxDrawdownPct: number;
  trades: number;
  /** Normalized equity 0–1 series for sparkline */
  equityCurve: number[];
  engine: "pocketmate-mock-v1";
  computedAt: number;
};

export type SavedStrategy = {
  id: string;
  name: string;
  templateId: string;
  notes: string;
  risk: BacktestRequest["risk"];
  timeframe: string;
  updatedAt: number;
  lastBacktest?: BacktestResult;
};

export type SimulatedDeployment = {
  id: string;
  strategyId: string;
  name: string;
  at: number;
  status: "simulated-live";
};
