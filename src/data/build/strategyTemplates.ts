import type { StrategyTemplate } from "@/lib/build/types";

export const STRATEGY_TEMPLATES: StrategyTemplate[] = [
  {
    id: "mean-reversion-eth",
    name: "ETH mean reversion",
    description:
      "Bollinger-style bands on high-liquidity hours; mean-revert entries with tight stops.",
    assetHint: "ETH / USD",
  },
  {
    id: "btc-momentum",
    name: "BTC momentum",
    description:
      "Trend filter + MACD confirmation; sizes down in high-vol regimes.",
    assetHint: "BTC / USD",
  },
  {
    id: "dca-stable",
    name: "Stable DCA",
    description:
      "Calendar DCA into a core basket with optional volatility throttle.",
    assetHint: "Multi-asset",
  },
  {
    id: "breakout-vol",
    name: "Volatility breakout",
    description:
      "Donchian-style breakouts with ATR-based trailing; meant for coursework backtests.",
    assetHint: "ETH · SOL",
  },
  {
    id: "carry-funding",
    name: "Funding carry (paper)",
    description:
      "Explains perpetual funding dynamics; outputs are fully simulated for class safety.",
    assetHint: "Perps (sim)",
  },
];

export function templateById(id: string): StrategyTemplate | undefined {
  return STRATEGY_TEMPLATES.find((t) => t.id === id);
}
