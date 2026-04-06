import type { CommunityStrategyPost } from "@/lib/community/types";

export const COMMUNITY_STRATEGY_FEED: CommunityStrategyPost[] = [
  {
    id: "cs-mr-eth-1",
    title: "ETH band classroom starter",
    summary:
      "Mean-reversion bands sized for 1h labs. Good first fork for tuning risk presets.",
    author: "A. Okonkwo",
    university: "Manchester",
    templateId: "mean-reversion-eth",
    simulatedSharpe: 1.42,
    simulatedReturnPct: 11.2,
    tag: "mean-reversion",
    updatedAt: "2026-03-28",
  },
  {
    id: "cs-mom-btc-2",
    title: "BTC momentum sprint (paper)",
    summary:
      "Trend gate + MACD confirmation. Built for short cohort competitions.",
    author: "S. Reeves",
    university: "Edinburgh",
    templateId: "btc-momentum",
    simulatedSharpe: 1.88,
    simulatedReturnPct: 18.4,
    tag: "momentum",
    updatedAt: "2026-03-30",
  },
  {
    id: "cs-dca-3",
    title: "Stable DCA syllabus track",
    summary:
      "Calendar DCA with volatility throttle—used in budgeting crossover modules.",
    author: "J. Patel",
    university: "Warwick",
    templateId: "dca-stable",
    simulatedSharpe: 0.95,
    simulatedReturnPct: 6.1,
    tag: "dca",
    updatedAt: "2026-04-01",
  },
  {
    id: "cs-bo-4",
    title: "Donchian breakout demo",
    summary:
      "Breakout practice with widening stops—good for risk conversation in class.",
    author: "L. Chen",
    university: "Imperial",
    templateId: "breakout-vol",
    simulatedSharpe: 1.15,
    simulatedReturnPct: 9.7,
    tag: "breakout",
    updatedAt: "2026-04-02",
  },
  {
    id: "cs-funding-5",
    title: "Funding carry explainer (sim)",
    summary:
      "Narrates perp funding without touching real leverage—sandbox only.",
    author: "R. Silva",
    university: "UCL",
    templateId: "carry-funding",
    simulatedSharpe: 0.72,
    simulatedReturnPct: 4.3,
    tag: "perps",
    updatedAt: "2026-04-03",
  },
  {
    id: "cs-mr-eth-6",
    title: "Quiet hours ETH revert",
    summary: "Filters on liquidity hours; smaller position caps for beginners.",
    author: "N. Müller",
    university: "TU Berlin",
    templateId: "mean-reversion-eth",
    simulatedSharpe: 1.21,
    simulatedReturnPct: 8.9,
    tag: "mean-reversion",
    updatedAt: "2026-04-04",
  },
];

export function feedPostById(id: string): CommunityStrategyPost | undefined {
  return COMMUNITY_STRATEGY_FEED.find((p) => p.id === id);
}
