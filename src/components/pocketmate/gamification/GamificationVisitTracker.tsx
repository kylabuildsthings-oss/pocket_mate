"use client";

import { useGamificationStore } from "@/store/gamification/useGamificationStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Rolls daily streak + first-visit-of-day activity XP when PocketMate routes change. */
export function GamificationVisitTracker() {
  const pathname = usePathname();
  const recordVisit = useGamificationStore((s) => s.recordVisit);

  useEffect(() => {
    recordVisit();
  }, [pathname, recordVisit]);

  return null;
}
