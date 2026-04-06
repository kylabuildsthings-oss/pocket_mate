export type GamificationBadgeDef = {
  id: string;
  title: string;
  description: string;
};

export const GAMIFICATION_BADGE_DEFS: GamificationBadgeDef[] = [
  {
    id: "streak-3",
    title: "On a streak",
    description: "Stay active for 3 consecutive days.",
  },
  {
    id: "streak-7",
    title: "Week streak",
    description: "Stay active for 7 consecutive days.",
  },
  {
    id: "xp-250",
    title: "Quarter-thousand",
    description: "Reach 250 total XP (learn + activity).",
  },
  {
    id: "xp-500",
    title: "Momentum",
    description: "Reach 500 total XP (learn + activity).",
  },
  {
    id: "level-5",
    title: "Level 5",
    description: "Reach account level 5.",
  },
  {
    id: "level-8",
    title: "Level 8",
    description: "Reach account level 8.",
  },
  {
    id: "sim-3",
    title: "Simulation regular",
    description: "Record 3 simulated trades from Trade mode.",
  },
  {
    id: "backtest-1",
    title: "Backtest curious",
    description: "Run a mock backtest from Build mode.",
  },
];
