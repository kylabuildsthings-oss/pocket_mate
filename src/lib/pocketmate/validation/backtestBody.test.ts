import { describe, expect, it } from "vitest";

import { validateBacktestBody } from "./backtestBody";

describe("validateBacktestBody", () => {
  it("accepts known template", () => {
    const r = validateBacktestBody({ templateId: "mean-reversion-eth" });
    expect(r.ok).toBe(true);
    expect(r.data?.risk).toBe("med");
  });

  it("rejects unknown template", () => {
    const r = validateBacktestBody({ templateId: "nope" });
    expect(r.ok).toBe(false);
  });

  it("normalizes risk", () => {
    const r = validateBacktestBody({
      templateId: "btc-momentum",
      risk: "high",
    });
    expect(r.ok).toBe(true);
    expect(r.data?.risk).toBe("high");
  });
});
