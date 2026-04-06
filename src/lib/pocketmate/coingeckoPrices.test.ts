import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  __resetPricesCacheForTests,
  getPocketmateReferencePrices,
} from "./coingeckoPrices";

describe("getPocketmateReferencePrices", () => {
  beforeEach(() => {
    __resetPricesCacheForTests();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    __resetPricesCacheForTests();
  });

  it("uses in-process cache on back-to-back calls", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ethereum: { usd: 1111 }, "usd-coin": { usd: 1 } }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const a = await getPocketmateReferencePrices();
    const b = await getPocketmateReferencePrices();

    expect(a.ethUsd).toBe(1111);
    expect(b.ethUsd).toBe(1111);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
