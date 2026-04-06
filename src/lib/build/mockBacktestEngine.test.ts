import { describe, expect, it } from "vitest";

import { runMockBacktest } from "./mockBacktestEngine";

describe("runMockBacktest", () => {
  it("is deterministic for the same input", () => {
    const req = {
      templateId: "mean-reversion-eth",
      strategyName: "Lab A",
      risk: "med" as const,
      timeframe: "1h",
    };
    const a = runMockBacktest(req);
    const b = runMockBacktest(req);
    expect(a.winRatePct).toBe(b.winRatePct);
    expect(a.equityCurve).toEqual(b.equityCurve);
  });
});
