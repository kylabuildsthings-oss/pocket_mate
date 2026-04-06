/**
 * Adapter boundary for a future real `freqtrade` (or similar) integration.
 * UI and mock engines depend on `BacktestResult`/`SavedStrategy`; this layer maps
 * PocketMate drafts into vendor-specific configs without coupling the app to Freqtrade types.
 */

import type { SavedStrategy } from "./types";

export type FreqtradeDryRunConfig = {
  strategyName: string;
  timeframe: string;
  dryRun: boolean;
  /** Opaque blob until we wire real strategy class / hyperopt exports */
  strategyModule: string;
  meta: {
    source: "pocketmate";
    templateId: string;
    exportedAt: string;
  };
};

export function strategyToFreqtradeStub(
  strategy: SavedStrategy
): FreqtradeDryRunConfig {
  return {
    strategyName: strategy.name.replace(/\s+/g, "_"),
    timeframe: strategy.timeframe,
    dryRun: true,
    strategyModule: `user_data/strategies/pocketmate_${strategy.templateId}.py`,
    meta: {
      source: "pocketmate",
      templateId: strategy.templateId,
      exportedAt: new Date().toISOString(),
    },
  };
}

/** Placeholder for HTTP/RPC bridge to a hosted Freqtrade service. */
export async function publishToFreqtradeService(
  _config: FreqtradeDryRunConfig
): Promise<{
  ok: boolean;
  message: string;
}> {
  return Promise.resolve({
    ok: false,
    message:
      "Freqtrade service bridge not configured. Use export JSON + local freqtrade until Gate 9+ hardening.",
  });
}
