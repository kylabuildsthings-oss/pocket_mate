"use client";

import { CommunityLeaderboardTabs } from "@/components/pocketmate/community/CommunityLeaderboardTabs";
import { StrategyFeedList } from "@/components/pocketmate/community/StrategyFeedList";
import { COMMUNITY_STRATEGY_FEED } from "@/data/community/feed";
import { Heading, Text, VStack } from "@chakra-ui/react";

const bodyFont = "var(--font-pm-body), system-ui, sans-serif";

export default function HubPage() {
  return (
    <VStack align="stretch" spacing={8}>
      <VStack align="start" spacing={2}>
        <Heading
          size="lg"
          color="pm.text"
          fontFamily={bodyFont}
          fontWeight="bold"
        >
          Community hub
        </Heading>
        <Text color="pm.muted" fontSize="md" maxW="760px" fontFamily={bodyFont}>
          Browse strategies with a live discussion preview from this browser.
          Open any card for the full thread, votes, and replies. Comments stay
          on-device until shared accounts ship.
        </Text>
      </VStack>

      <VStack align="stretch" spacing={3}>
        <Heading
          size="sm"
          color="pm.text"
          fontFamily={bodyFont}
          fontWeight="semibold"
        >
          Strategy feed
        </Heading>
        <StrategyFeedList items={COMMUNITY_STRATEGY_FEED} />
      </VStack>

      <VStack align="stretch" spacing={3}>
        <Heading
          size="sm"
          color="pm.text"
          fontFamily={bodyFont}
          fontWeight="semibold"
        >
          Leaderboards
        </Heading>
        <CommunityLeaderboardTabs />
      </VStack>
    </VStack>
  );
}
