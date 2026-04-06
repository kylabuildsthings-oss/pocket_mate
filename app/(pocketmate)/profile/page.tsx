"use client";

import { AchievementGallery } from "@/components/pocketmate/gamification/AchievementGallery";
import { ExperienceBar } from "@/components/pocketmate/gamification/ExperienceBar";
import { LeaderboardPanel } from "@/components/pocketmate/gamification/LeaderboardPanel";
import { StreakCard } from "@/components/pocketmate/gamification/StreakCard";
import { PMCard } from "@/components/pocketmate/PMCard";
import { useTotalXp } from "@/hooks/useTotalXp";
import {
  leaderboardScore,
  strategyIndex,
} from "@/lib/gamification/leaderboardModel";
import { levelFromTotalXp } from "@/lib/gamification/xpEngine";
import { useGamificationStore } from "@/store/gamification/useGamificationStore";
import { useLearnStore } from "@/store/learn/useLearnStore";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function ProfilePage() {
  const total = useTotalXp();
  const level = levelFromTotalXp(total);
  const learnXp = useLearnStore((s) => s.xp);
  const activityXp = useGamificationStore((s) => s.activityXp);
  const streak = useGamificationStore((s) => s.streakDays);
  const paper = useGamificationStore((s) => s.paperTradesCount);
  const backtests = useGamificationStore((s) => s.backtestsRun);
  const resetLearn = useLearnStore((s) => s.resetProgress);
  const resetGame = useGamificationStore((s) => s.reset);

  const inputs = {
    learnXp,
    activityXp,
    streakDays: streak,
    paperTrades: paper,
    backtests,
  };

  return (
    <VStack align="stretch" spacing={10}>
      <VStack align="start" spacing={2}>
        <Heading
          size="lg"
          fontFamily="var(--font-pm-heading), system-ui, sans-serif"
          color="pm.text"
        >
          Profile & progress
        </Heading>
        <Text color="pm.muted" maxW="3xl">
          Local-first gamification: XP engine, levels, streaks, achievements,
          celebration bus, and a mock leaderboard until auth + APIs arrive.
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} alignItems="start">
        <PMCard>
          <Text fontSize="sm" color="pm.muted" mb={2}>
            Account level (from total XP)
          </Text>
          <Text fontSize="4xl" fontWeight="bold" color="pm.text">
            {level}
          </Text>
          <Box mt={6}>
            <ExperienceBar />
          </Box>
          <SimpleGrid columns={2} spacing={3} mt={6}>
            <Box>
              <Text fontSize="xs" color="pm.muted">
                Learn XP
              </Text>
              <Text fontWeight="semibold" color="pm.text">
                {learnXp}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xs" color="pm.muted">
                Activity XP
              </Text>
              <Text fontWeight="semibold" color="pm.text">
                {activityXp}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xs" color="pm.muted">
                Strategy index
              </Text>
              <Text fontWeight="semibold" color="pm.text">
                {strategyIndex(inputs)}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xs" color="pm.muted">
                League score
              </Text>
              <Text fontWeight="semibold" color="pm.text">
                {leaderboardScore(inputs)}
              </Text>
            </Box>
          </SimpleGrid>
        </PMCard>
        <StreakCard />
      </SimpleGrid>

      <AchievementGallery />

      <LeaderboardPanel />

      <Box>
        <Button
          size="sm"
          variant="ghost"
          color="pm.muted"
          onClick={() => {
            resetLearn();
            resetGame();
          }}
        >
          Reset all local learn + gamification data
        </Button>
      </Box>
    </VStack>
  );
}
