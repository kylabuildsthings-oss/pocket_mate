"use client";

import { CommunityLeaderboardTabs } from "@/components/pocketmate/community/CommunityLeaderboardTabs";
import { StrategyFeedList } from "@/components/pocketmate/community/StrategyFeedList";
import { COMMUNITY_STRATEGY_FEED } from "@/data/community/feed";
import { Heading, Link as ChakraLink, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";

const headingFont = "var(--font-pm-heading), system-ui, sans-serif";

export default function HubPage() {
  return (
    <VStack align="stretch" spacing={8}>
      <VStack align="start" spacing={2}>
        <Heading size="lg" fontFamily={headingFont} color="pm.text">
          Community hub
        </Heading>
        <Text color="pm.muted" fontSize="md" maxW="760px">
          Strategy feed, discussion threads per strategy, and leaderboards.
          Comments and votes stay on this device until accounts ship. Legacy
          DefiKids social links still live at{" "}
          <ChakraLink
            as={NextLink}
            href="/community"
            color="pm.primarySoft"
            textDecor="underline"
          >
            /community
          </ChakraLink>
          .
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
          Leaderboards
        </Heading>
        <CommunityLeaderboardTabs />
      </VStack>
    </VStack>
  );
}
