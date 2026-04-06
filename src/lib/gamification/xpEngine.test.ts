import { describe, expect, it } from "vitest";

import { getLevelProgress, levelFromTotalXp, xpToReachLevel } from "./xpEngine";

describe("xpEngine", () => {
  it("xpToReachLevel is non-decreasing", () => {
    for (let l = 1; l <= 10; l += 1) {
      expect(xpToReachLevel(l + 1)).toBeGreaterThanOrEqual(xpToReachLevel(l));
    }
  });

  it("levelFromTotalXp matches boundaries", () => {
    expect(levelFromTotalXp(0)).toBe(1);
    expect(levelFromTotalXp(xpToReachLevel(2) - 1)).toBe(1);
    expect(levelFromTotalXp(xpToReachLevel(2))).toBe(2);
  });

  it("getLevelProgress pct is in range", () => {
    const p = getLevelProgress(350);
    expect(p.level).toBeGreaterThanOrEqual(1);
    expect(p.pct).toBeGreaterThanOrEqual(0);
    expect(p.pct).toBeLessThanOrEqual(100);
  });
});
