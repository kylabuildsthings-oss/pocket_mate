"use client";

import { getLevelProgress } from "@/lib/gamification/xpEngine";
import { useTotalXp } from "@/hooks/useTotalXp";
import { Box, Progress, Text, VStack } from "@chakra-ui/react";

export function ExperienceBar() {
  const total = useTotalXp();
  const { level, xpInto, xpForLevelSpan } = getLevelProgress(total);

  return (
    <VStack align="stretch" spacing={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        gap={4}
      >
        <Text fontWeight="bold" color="pm.text" fontSize="lg">
          Level {level}
        </Text>
        <Text fontSize="sm" color="pm.muted">
          {xpInto} / {xpForLevelSpan} XP this level · {total} XP total
        </Text>
      </Box>
      <Progress
        value={(xpInto / xpForLevelSpan) * 100}
        size="sm"
        borderRadius="md"
        colorScheme="purple"
        bg="pm.surfaceHover"
      />
    </VStack>
  );
}
