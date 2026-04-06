"use client";

import { PMCard } from "@/components/pocketmate/PMCard";
import { useGamificationStore } from "@/store/gamification/useGamificationStore";
import { Text, VStack } from "@chakra-ui/react";

export function StreakCard() {
  const streakDays = useGamificationStore((s) => s.streakDays);
  const lastActiveYmd = useGamificationStore((s) => s.lastActiveYmd);

  return (
    <PMCard>
      <VStack align="start" spacing={2}>
        <Text fontWeight="semibold" color="pm.text">
          Activity streak
        </Text>
        <Text fontSize="4xl" fontWeight="bold" color="pm.primarySoft">
          {streakDays} day{streakDays === 1 ? "" : "s"}
        </Text>
        <Text fontSize="sm" color="pm.muted">
          Consecutive PocketMate days with a recorded visit. Opening any route
          once per day keeps your streak alive (+5 activity XP on the first
          visit each day).
        </Text>
        {lastActiveYmd ? (
          <Text fontSize="xs" color="pm.muted">
            Last counted: {lastActiveYmd}
          </Text>
        ) : null}
      </VStack>
    </PMCard>
  );
}
