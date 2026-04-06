import { describe, expect, it } from "vitest";

import { makeReceiptHash, quoteSwap, simulateSwap } from "./simEngine";

describe("simEngine", () => {
  it("makeReceiptHash is order-insensitive", () => {
    expect(makeReceiptHash({ b: 2, a: 1 })).toBe(
      makeReceiptHash({ a: 1, b: 2 })
    );
  });

  it("quoteSwap handles invalid input", () => {
    expect(quoteSwap(-1, "ETH", 2000).amountOut).toBe(0);
  });

  it("simulateSwap produces stable receipt shape", () => {
    const r = simulateSwap({
      amountIn: 1,
      tokenIn: "ETH",
      ethUsd: 2500,
      mode: "demo",
      nonce: 7,
    });
    expect(r.receiptHash).toMatch(/^0x[0-9a-f]{64}$/i);
    expect(r.surface).toBe("swap");
    expect(r.mode).toBe("demo");
  });
});
