import { describe, expect, it } from "vitest";

import { validateReportBody } from "./reportBody";

describe("validateReportBody", () => {
  it("accepts valid payload", () => {
    const r = validateReportBody({
      targetType: "strategy",
      targetId: "cs-1",
      reason: "Spam or misleading backtest numbers",
    });
    expect(r.ok).toBe(true);
    expect(r.data?.targetType).toBe("strategy");
  });

  it("rejects short reason", () => {
    const r = validateReportBody({
      targetType: "comment",
      targetId: "c1",
      reason: "short",
    });
    expect(r.ok).toBe(false);
    expect(r.errors?.length).toBeGreaterThan(0);
  });

  it("rejects bad targetType", () => {
    const r = validateReportBody({
      targetType: "user",
      targetId: "x",
      reason: "Long enough reason here",
    });
    expect(r.ok).toBe(false);
  });
});
