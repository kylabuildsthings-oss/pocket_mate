"use client";

import { useEffect, useState } from "react";

export type ReferencePrices = {
  ethUsd: number;
  usdcUsd: number;
  source: string;
  at: number | null;
};

const FALLBACK: ReferencePrices = {
  ethUsd: 3200,
  usdcUsd: 1,
  source: "client-fallback",
  at: null,
};

export function useReferencePrices(): ReferencePrices {
  const [state, setState] = useState<ReferencePrices>(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/pocketmate/prices");
        if (!r.ok) throw new Error("bad");
        const j = (await r.json()) as {
          ethUsd: number;
          usdcUsd: number;
          source: string;
          at: number;
        };
        if (!cancelled) {
          setState({
            ethUsd: j.ethUsd,
            usdcUsd: j.usdcUsd,
            source: j.source,
            at: j.at,
          });
        }
      } catch {
        if (!cancelled) setState(FALLBACK);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
