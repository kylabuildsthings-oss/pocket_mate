import {
  leaderboardScore,
  type LeaderboardInputs,
} from "@/lib/gamification/leaderboardModel";

export type MockLeaderRow = {
  id: string;
  displayName: string;
  university: string;
  inputs: LeaderboardInputs;
};

/** Synthetic cohort for UI until accounts + API ship */
export const MOCK_LEADERBOARD_ROWS: MockLeaderRow[] = [
  {
    id: "m1",
    displayName: "A. Okonkwo",
    university: "Manchester",
    inputs: {
      learnXp: 420,
      activityXp: 90,
      streakDays: 5,
      paperTrades: 8,
      backtests: 2,
    },
  },
  {
    id: "m2",
    displayName: "S. Reeves",
    university: "Edinburgh",
    inputs: {
      learnXp: 380,
      activityXp: 110,
      streakDays: 12,
      paperTrades: 4,
      backtests: 4,
    },
  },
  {
    id: "m3",
    displayName: "J. Patel",
    university: "Warwick",
    inputs: {
      learnXp: 310,
      activityXp: 45,
      streakDays: 3,
      paperTrades: 12,
      backtests: 1,
    },
  },
  {
    id: "m4",
    displayName: "L. Chen",
    university: "Imperial",
    inputs: {
      learnXp: 290,
      activityXp: 140,
      streakDays: 9,
      paperTrades: 6,
      backtests: 3,
    },
  },
  {
    id: "m5",
    displayName: "R. Silva",
    university: "UCL",
    inputs: {
      learnXp: 255,
      activityXp: 35,
      streakDays: 2,
      paperTrades: 2,
      backtests: 0,
    },
  },
  {
    id: "m6",
    displayName: "N. Müller",
    university: "TU Berlin",
    inputs: {
      learnXp: 240,
      activityXp: 60,
      streakDays: 6,
      paperTrades: 5,
      backtests: 2,
    },
  },
  {
    id: "m7",
    displayName: "K. Adeyemi",
    university: "Lagos",
    inputs: {
      learnXp: 210,
      activityXp: 25,
      streakDays: 4,
      paperTrades: 9,
      backtests: 0,
    },
  },
  {
    id: "m8",
    displayName: "T. Nguyen",
    university: "Sydney",
    inputs: {
      learnXp: 190,
      activityXp: 80,
      streakDays: 7,
      paperTrades: 3,
      backtests: 2,
    },
  },
];

export function rankRows(player: {
  displayName: string;
  university: string;
  inputs: LeaderboardInputs;
}) {
  const enriched = [
    ...MOCK_LEADERBOARD_ROWS.map((r) => ({
      ...r,
      score: leaderboardScore(r.inputs),
      isPlayer: false as const,
    })),
    {
      id: "you",
      displayName: player.displayName,
      university: player.university,
      inputs: player.inputs,
      score: leaderboardScore(player.inputs),
      isPlayer: true as const,
    },
  ];
  enriched.sort((a, b) => b.score - a.score);
  return enriched.map((r, idx) => ({ ...r, rank: idx + 1 }));
}
