"use client";

import { PMCard } from "@/components/pocketmate/PMCard";
import { PMBadge } from "@/components/pocketmate/PMBadge";
import type { CommunityStrategyPost } from "@/lib/community/types";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export function StrategyFeedList({
  items,
}: {
  items: CommunityStrategyPost[];
}) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      {items.map((p) => (
        <Link key={p.id} href={`/hub/strategy/${p.id}`}>
          <PMCard h="full" cursor="pointer">
            <VStack align="stretch" spacing={3}>
              <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
                <Text fontWeight="bold" color="pm.text" fontSize="md">
                  {p.title}
                </Text>
                <PMBadge tone="primary">{p.tag}</PMBadge>
              </Box>
              <Text fontSize="sm" color="pm.muted" lineHeight="short">
                {p.summary}
              </Text>
              <Text fontSize="xs" color="pm.muted">
                {p.author} · {p.university} · updated {p.updatedAt}
              </Text>
              <Box display="flex" gap={4} fontSize="xs" color="pm.text">
                <Text>Sim return {p.simulatedReturnPct}%</Text>
                <Text>Sharpe {p.simulatedSharpe}</Text>
              </Box>
            </VStack>
          </PMCard>
        </Link>
      ))}
    </SimpleGrid>
  );
}
