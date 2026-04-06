"use client";

import { PMCard } from "@/components/pocketmate/PMCard";
import { PMBadge } from "@/components/pocketmate/PMBadge";
import type { CommunityStrategyPost } from "@/lib/community/types";
import { useCommunityStore } from "@/store/community/useCommunityStore";
import { Box, Divider, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useMemo } from "react";

const bodyFont = "var(--font-pm-body), system-ui, sans-serif";
const PREVIEW_CHARS = 120;

function FeedCardDiscussionPreview({ strategyId }: { strategyId: string }) {
  const comments = useCommunityStore((s) => s.comments);

  const preview = useMemo(() => {
    return [...comments]
      .filter((c) => c.strategyId === strategyId)
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 2);
  }, [comments, strategyId]);

  const total = useMemo(
    () => comments.filter((c) => c.strategyId === strategyId).length,
    [comments, strategyId]
  );

  return (
    <Box pt={3} mt={1}>
      <Divider borderColor="pm.border" mb={3} />
      <Text
        fontSize="xs"
        fontWeight="semibold"
        color="pm.muted"
        textTransform="uppercase"
        letterSpacing="wider"
        mb={2}
        fontFamily={bodyFont}
      >
        Discussion preview
      </Text>
      {preview.length === 0 ? (
        <Text fontSize="xs" color="pm.muted" fontFamily={bodyFont}>
          No comments on this device yet—open the strategy to start a thread.
        </Text>
      ) : (
        <VStack align="stretch" spacing={2}>
          {preview.map((c) => {
            const snippet =
              c.body.length > PREVIEW_CHARS
                ? `${c.body.slice(0, PREVIEW_CHARS)}…`
                : c.body;
            return (
              <Text
                key={c.id}
                fontSize="xs"
                color="pm.text"
                fontFamily={bodyFont}
                lineHeight="short"
                noOfLines={3}
              >
                <Text as="span" fontWeight="semibold">
                  {c.author}:{" "}
                </Text>
                {snippet}
              </Text>
            );
          })}
          {total > preview.length ? (
            <Text fontSize="xs" color="pm.primarySoft" fontFamily={bodyFont}>
              +{total - preview.length} more on this device
            </Text>
          ) : null}
        </VStack>
      )}
    </Box>
  );
}

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
                <Text
                  fontWeight="bold"
                  color="pm.text"
                  fontSize="md"
                  fontFamily={bodyFont}
                >
                  {p.title}
                </Text>
                <PMBadge tone="primary">{p.tag}</PMBadge>
              </Box>
              <Text
                fontSize="sm"
                color="pm.muted"
                lineHeight="short"
                fontFamily={bodyFont}
              >
                {p.summary}
              </Text>
              <Text fontSize="xs" color="pm.muted" fontFamily={bodyFont}>
                {p.author} · {p.university} · updated {p.updatedAt}
              </Text>
              <Box
                display="flex"
                gap={4}
                fontSize="xs"
                color="pm.text"
                fontFamily={bodyFont}
              >
                <Text>Sim return {p.simulatedReturnPct}%</Text>
                <Text>Sharpe {p.simulatedSharpe}</Text>
              </Box>
              <FeedCardDiscussionPreview strategyId={p.id} />
            </VStack>
          </PMCard>
        </Link>
      ))}
    </SimpleGrid>
  );
}
