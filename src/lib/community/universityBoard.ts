import { leaderboardScore } from "@/lib/gamification/leaderboardModel";
import type { MockLeaderRow } from "@/data/gamification/mockLeaderboard";

export type UniAggregateRow = {
  university: string;
  score: number;
  memberCount: number;
  topMember: string;
};

export function studentLeaderboard(rows: MockLeaderRow[]) {
  return rows
    .map((r) => ({
      id: r.id,
      displayName: r.displayName,
      university: r.university,
      score: leaderboardScore(r.inputs),
    }))
    .sort((a, b) => b.score - a.score)
    .map((r, i) => ({ ...r, rank: i + 1 }));
}

export function universityLeaderboard(
  rows: MockLeaderRow[]
): UniAggregateRow[] {
  const map = new Map<
    string,
    { total: number; count: number; top: { name: string; score: number } }
  >();
  for (const r of rows) {
    const score = leaderboardScore(r.inputs);
    const cur = map.get(r.university) ?? {
      total: 0,
      count: 0,
      top: { name: r.displayName, score: -1 },
    };
    cur.total += score;
    cur.count += 1;
    if (score > cur.top.score) {
      cur.top = { name: r.displayName, score };
    }
    map.set(r.university, cur);
  }
  const out: UniAggregateRow[] = [];
  for (const [university, v] of map) {
    out.push({
      university,
      score: Math.round(v.total / Math.max(1, v.count)),
      memberCount: v.count,
      topMember: v.top.name,
    });
  }
  out.sort((a, b) => b.score - a.score);
  return out;
}
