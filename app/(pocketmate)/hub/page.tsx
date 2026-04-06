"use client";

import { CommunityLeaderboardTabs } from "@/components/pocketmate/community/CommunityLeaderboardTabs";
import { StrategyFeedList } from "@/components/pocketmate/community/StrategyFeedList";
import { COMMUNITY_STRATEGY_FEED } from "@/data/community/feed";
import { Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { PMCard } from "@/components/pocketmate/PMCard";
import { PMBadge } from "@/components/pocketmate/PMBadge";

const headingFont = "var(--font-pm-heading), system-ui, sans-serif";

export default function HubPage() {
  return (
    <VStack align="stretch" spacing={8}>
      <VStack align="start" spacing={2}>
        <Heading size="lg" fontFamily={headingFont} color="pm.text">
          Community hub
        </Heading>
        <Text color="pm.muted" fontSize="md" maxW="760px">
          Strategy feed, per-strategy discussions, and leaderboards. Comments
          and votes stay on this device until shared accounts ship—the{" "}
          <Text as="span" fontWeight="semibold" color="pm.text">
            Strategy discussions
          </Text>{" "}
          section below lists each strategy; threads go live with the account
          milestone.
        </Text>
      </VStack>

      <VStack align="stretch" spacing={3}>
        <Heading size="sm" fontFamily={headingFont} color="pm.text">
          Strategy feed
        </Heading>
        <StrategyFeedList items={COMMUNITY_STRATEGY_FEED} />
      </VStack>

      <VStack align="stretch" spacing={3}>
        <Heading size="sm" fontFamily={headingFont} color="pm.text">
          Strategy discussions
        </Heading>
        <Text color="pm.muted" fontSize="sm" maxW="760px">
          Each card matches a feed strategy. Multiplayer comment threads are not
          wired up yet; for now, open a strategy to read context—or use class
          channels your institution provides.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {COMMUNITY_STRATEGY_FEED.map((p) => (
            <Link key={p.id} href={`/hub/strategy/${p.id}`}>
              <PMCard h="full" cursor="pointer">
                <VStack align="stretch" spacing={2}>
                  <Text
                    fontWeight="semibold"
                    color="pm.text"
                    fontSize="sm"
                    fontFamily="var(--font-pm-body), system-ui, sans-serif"
                  >
                    {p.title}
                  </Text>
                  <PMBadge tone="primary" alignSelf="flex-start">
                    Discussion (preview)
                  </PMBadge>
                  <Text fontSize="xs" color="pm.muted">
                    Thread UI and cross-device sync ship with the next account
                    milestone.
                  </Text>
                </VStack>
              </PMCard>
            </Link>
          ))}
        </SimpleGrid>
      </VStack>

      <VStack align="stretch" spacing={3}>
        <Heading size="sm" fontFamily={headingFont} color="pm.text">
          Leaderboards
        </Heading>
        <CommunityLeaderboardTabs />
      </VStack>
    </VStack>
  );
}
