"use client";

import { ExperienceBar } from "@/components/pocketmate/gamification/ExperienceBar";
import { PMCard } from "@/components/pocketmate/PMCard";
import { PMStat } from "@/components/pocketmate/PMStat";
import { PocketMateStubPage } from "@/components/pocketmate/PocketMateStubPage";
import {
  leaderboardScore,
  strategyIndex,
} from "@/lib/gamification/leaderboardModel";
import { useTotalXp } from "@/hooks/useTotalXp";
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
import Link from "next/link";

export default function DashboardPage() {
  const totalXp = useTotalXp();
  const learnXp = useLearnStore((s) => s.xp);
  const activityXp = useGamificationStore((s) => s.activityXp);
  const streak = useGamificationStore((s) => s.streakDays);
  const paper = useGamificationStore((s) => s.paperTradesCount);
  const backtests = useGamificationStore((s) => s.backtestsRun);
  const learnBadges = useLearnStore((s) => s.badgeIds.length);
  const gameBadges = useGamificationStore((s) => s.badgeIds.length);

  const inputs = {
    learnXp,
    activityXp,
    streakDays: streak,
    paperTrades: paper,
    backtests,
  };
  const league = leaderboardScore(inputs);
  const strat = strategyIndex(inputs);

  return (
    <VStack align="stretch" spacing={8}>
      <PocketMateStubPage
        title="Dashboard"
        description="Overview of portfolio, demo balances, and quick actions. This is the hub students return to after Learn and Trade sessions."
      />

      <Box>
        <Heading
          size="sm"
          color="pm.text"
          mb={3}
          fontFamily="var(--font-pm-heading), system-ui"
        >
          Progress (Phase 7)
        </Heading>
        <PMCard>
          <ExperienceBar />
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={6}>
            <PMStat
              label="Learn XP"
              value={String(learnXp)}
              hint="Lessons + quizzes"
            />
            <PMStat
              label="Activity XP"
              value={String(activityXp)}
              hint="Visits, trade sim, backtests"
            />
            <PMStat
              label="Streak"
              value={`${streak}d`}
              hint="Consecutive active days"
            />
            <PMStat
              label="Strategy index"
              value={String(strat)}
              hint="Capped placeholder from Build/Trade"
            />
            <PMStat
              label="League score"
              value={String(league)}
              hint="Model: XP + streak + strategy"
            />
            <PMStat
              label="Badges"
              value={String(learnBadges + gameBadges)}
              hint="Academy + campus"
            />
          </SimpleGrid>
          <Text fontSize="sm" color="pm.muted" mt={4}>
            Total XP driving your level: {totalXp}.
          </Text>
          <Button
            as={Link}
            href="/profile"
            variant="outline"
            borderColor="pm.border"
            color="pm.text"
            mt={4}
          >
            Open full progress & leaderboard
          </Button>
        </PMCard>
      </Box>
    </VStack>
  );
}
