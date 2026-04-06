"use client";

import { useGamificationStore } from "@/store/gamification/useGamificationStore";
import { useLearnStore } from "@/store/learn/useLearnStore";

export function useTotalXp(): number {
  const learnXp = useLearnStore((s) => s.xp);
  const activityXp = useGamificationStore((s) => s.activityXp);
  return learnXp + activityXp;
}
