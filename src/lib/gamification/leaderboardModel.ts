export type LeaderboardInputs = {
  learnXp: number;
  activityXp: number;
  streakDays: number;
  paperTrades: number;
  backtests: number;
};

/**
 * Placeholder scoring until server-backed leagues exist.
 * Strategy points cap at 100 from local activity counters.
 */
export function strategyIndex(i: LeaderboardInputs): number {
  return Math.min(100, i.backtests * 18 + i.paperTrades * 6);
}

export function leaderboardScore(i: LeaderboardInputs): number {
  const strat = strategyIndex(i);
  return Math.round(
    i.learnXp + i.activityXp + strat * 0.45 + i.streakDays * 10
  );
}
