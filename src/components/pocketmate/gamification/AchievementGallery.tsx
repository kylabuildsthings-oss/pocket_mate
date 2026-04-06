"use client";

import { PMCard } from "@/components/pocketmate/PMCard";
import { PMBadge } from "@/components/pocketmate/PMBadge";
import { GAMIFICATION_BADGE_DEFS } from "@/data/gamification/badges";
import { LEARN_BADGES } from "@/store/learn/useLearnStore";
import { useGamificationStore } from "@/store/gamification/useGamificationStore";
import { useLearnStore } from "@/store/learn/useLearnStore";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";

export function AchievementGallery() {
  const learnBadgeIds = useLearnStore((s) => s.badgeIds);
  const gameBadgeIds = useGamificationStore((s) => s.badgeIds);
  const learnSet = new Set(learnBadgeIds);
  const gameSet = new Set(gameBadgeIds);

  const learnItems = LEARN_BADGES.map((b) => ({
    kind: "learn" as const,
    id: b.id,
    title: b.title,
    description: b.description,
    unlocked: learnSet.has(b.id),
  }));

  const gameItems = GAMIFICATION_BADGE_DEFS.map((b) => ({
    kind: "game" as const,
    id: b.id,
    title: b.title,
    description: b.description,
    unlocked: gameSet.has(b.id),
  }));

  const rows = [...learnItems, ...gameItems].sort((a, b) => {
    if (a.unlocked === b.unlocked) return a.title.localeCompare(b.title);
    return a.unlocked ? -1 : 1;
  });

  return (
    <PMCard>
      <Text fontWeight="semibold" color="pm.text" mb={4}>
        Achievements
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
        {rows.map((r) => (
          <Box
            key={`${r.kind}-${r.id}`}
            borderWidth="1px"
            borderColor={r.unlocked ? "pm.primarySoft" : "pm.border"}
            borderRadius="lg"
            p={3}
            bg={r.unlocked ? "pm.surfaceHover" : "transparent"}
            opacity={r.unlocked ? 1 : 0.55}
          >
            <VStack align="start" spacing={1}>
              <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                <Text fontSize="sm" fontWeight="semibold" color="pm.text">
                  {r.title}
                </Text>
                <PMBadge tone={r.kind === "learn" ? "primary" : "success"}>
                  {r.kind === "learn" ? "Academy" : "Campus"}
                </PMBadge>
                {r.unlocked ? (
                  <PMBadge tone="success">Unlocked</PMBadge>
                ) : (
                  <PMBadge>Locked</PMBadge>
                )}
              </Box>
              <Text fontSize="xs" color="pm.muted">
                {r.description}
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </PMCard>
  );
}
