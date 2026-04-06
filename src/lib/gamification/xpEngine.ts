/** Cumulative XP required to *begin* this level (level 1 starts at 0). */
export function xpToReachLevel(level: number): number {
  if (level <= 1) return 0;
  const n = level - 1;
  return n * 120 + 20 * n * (n - 1);
}

export function levelFromTotalXp(totalXp: number): number {
  let level = 1;
  while (totalXp >= xpToReachLevel(level + 1) && level < 999) {
    level += 1;
  }
  return level;
}

export type LevelProgress = {
  level: number;
  xpInto: number;
  xpForLevelSpan: number;
  pct: number;
};

export function getLevelProgress(totalXp: number): LevelProgress {
  const level = levelFromTotalXp(totalXp);
  const floor = xpToReachLevel(level);
  const ceil = xpToReachLevel(level + 1);
  const into = Math.max(0, totalXp - floor);
  const span = Math.max(1, ceil - floor);
  const pct = Math.min(100, (into / span) * 100);
  return { level, xpInto: into, xpForLevelSpan: span, pct };
}
