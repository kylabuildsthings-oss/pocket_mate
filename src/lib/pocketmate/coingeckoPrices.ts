export type PricesPayload = {
  ethUsd: number;
  usdcUsd: number;
  source: "coingecko" | "fallback";
  at: number;
};

const COINGECKO =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin&vs_currencies=usd";

/** In-process cache (per server instance). Short TTL limits CoinGecko rate use. */
const TTL_MS = 45_000;

let cache: { expiresAt: number; payload: PricesPayload } | null = null;

function fallbackPayload(): PricesPayload {
  return {
    ethUsd: 3200,
    usdcUsd: 1,
    source: "fallback",
    at: Date.now(),
  };
}

export async function getPocketmateReferencePrices(): Promise<PricesPayload> {
  const now = Date.now();
  if (cache && cache.expiresAt > now) {
    return cache.payload;
  }

  try {
    const r = await fetch(COINGECKO, {
      headers: { accept: "application/json" },
    });
    if (!r.ok) {
      throw new Error("upstream");
    }
    const j = (await r.json()) as {
      ethereum?: { usd?: number };
      "usd-coin"?: { usd?: number };
    };
    const payload: PricesPayload = {
      ethUsd: j.ethereum?.usd ?? 3200,
      usdcUsd: j["usd-coin"]?.usd ?? 1,
      source: "coingecko",
      at: Date.now(),
    };
    cache = { expiresAt: now + TTL_MS, payload };
    return payload;
  } catch {
    const payload = fallbackPayload();
    cache = { expiresAt: now + TTL_MS, payload };
    return payload;
  }
}

/** Test helper */
export function __resetPricesCacheForTests() {
  cache = null;
}
