import {
  getPocketmateReferencePrices,
  type PricesPayload,
} from "@/lib/pocketmate/coingeckoPrices";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Read-only reference prices — cached in-process + HTTP Cache-Control for CDN/browser.
 * s-maxage: shared caches; stale-while-revalidate: serve stale while revalidating.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PricesPayload>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end();
    return;
  }

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=120"
  );
  res.setHeader("X-Content-Type-Options", "nosniff");

  try {
    const payload = await getPocketmateReferencePrices();
    res.status(200).json(payload);
  } catch (e) {
    console.error("[pocketmate/prices]", e);
    res.status(200).json({
      ethUsd: 3200,
      usdcUsd: 1,
      source: "fallback",
      at: Date.now(),
    });
  }
}
