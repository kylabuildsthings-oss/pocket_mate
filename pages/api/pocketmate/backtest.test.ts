import { createMocks } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
import { describe, expect, it } from "vitest";

import handler from "./backtest";

describe("POST /api/pocketmate/backtest", () => {
  it("returns 400 for unknown template", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      body: { templateId: "not-a-real-template" },
    });
    await handler(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("returns metrics for valid template", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      body: {
        templateId: "mean-reversion-eth",
        strategyName: "Unit test",
        risk: "low",
      },
    });
    await handler(req, res);
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res._getData() as string);
    expect(body.templateId).toBe("mean-reversion-eth");
    expect(typeof body.winRatePct).toBe("number");
    expect(Array.isArray(body.equityCurve)).toBe(true);
  });
});
