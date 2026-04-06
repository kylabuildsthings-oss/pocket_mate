import { createMocks } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
import { describe, expect, it } from "vitest";

import handler from "./report";

describe("POST /api/pocketmate/report", () => {
  it("returns 405 for GET", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
    });
    await handler(req, res);
    expect(res.statusCode).toBe(405);
  });

  it("returns 400 for invalid body", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      body: { targetType: "strategy", targetId: "x", reason: "nope" },
    });
    await handler(req, res);
    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res._getData() as string);
    expect(body.error).toBeDefined();
  });

  it("returns 200 for valid body", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      body: {
        targetType: "comment",
        targetId: "c_123",
        reason: "Contains abusive language toward other students",
      },
    });
    await handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res._getData() as string)).toEqual({ ok: true });
  });
});
