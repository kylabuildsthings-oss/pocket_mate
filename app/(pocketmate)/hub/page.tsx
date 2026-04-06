"use client";

import { CommunityLeaderboardTabs } from "@/components/pocketmate/community/CommunityLeaderboardTabs";
import { StrategyFeedList } from "@/components/pocketmate/community/StrategyFeedList";
import { COMMUNITY_STRATEGY_FEED } from "@/data/community/feed";
import type { CommunityStrategyPost } from "@/lib/community/types";
import { useCommunityStore } from "@/store/community/useCommunityStore";
import {
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { MdSearch } from "react-icons/md";

const bodyFont = "var(--font-pm-body), system-ui, sans-serif";

function uniqueTags(posts: CommunityStrategyPost[]): string[] {
  return [...new Set(posts.map((p) => p.tag))].sort((a, b) =>
    a.localeCompare(b)
  );
}

function postMatchesSearch(
  post: CommunityStrategyPost,
  q: string,
  commentBodies: string[]
): boolean {
  if (!q) return true;
  const hay = [
    post.title,
    post.summary,
    post.author,
    post.university,
    post.tag,
    post.templateId,
    ...commentBodies,
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

export default function HubPage() {
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const comments = useCommunityStore((s) => s.comments);

  const tags = useMemo(() => uniqueTags(COMMUNITY_STRATEGY_FEED), []);

  const filteredFeed = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COMMUNITY_STRATEGY_FEED.filter((post) => {
      if (tagFilter !== "all" && post.tag !== tagFilter) return false;
      const bodies = comments
        .filter((c) => c.strategyId === post.id)
        .map((c) => c.body);
      return postMatchesSearch(post, q, bodies);
    });
  }, [comments, query, tagFilter]);

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
          Search matches titles, authors, tags, and comment text on this device.
          Open any card for the full thread, votes, and replies.
        </Text>
      </VStack>

      <InputGroup>
        <InputLeftElement pointerEvents="none" h="full">
          <MdSearch color="gray" />
        </InputLeftElement>
        <Input
          placeholder="Search strategies or discussions…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          bg="pm.surface"
          borderColor="pm.border"
          color="pm.text"
          fontFamily={bodyFont}
          _placeholder={{ color: "pm.muted" }}
        />
      </InputGroup>

      <Select
        maxW={{ base: "full", md: "280px" }}
        value={tagFilter}
        onChange={(e) => setTagFilter(e.target.value)}
        bg="pm.surface"
        borderColor="pm.border"
        color="pm.text"
        fontFamily={bodyFont}
      >
        <option value="all">All strategy tags</option>
        {tags.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </Select>

      <VStack align="stretch" spacing={3}>
        <Heading
          size="sm"
          color="pm.text"
          fontFamily={bodyFont}
          fontWeight="semibold"
        >
          Strategy feed
        </Heading>
        <Text fontSize="sm" color="pm.muted" fontFamily={bodyFont}>
          Showing {filteredFeed.length} of {COMMUNITY_STRATEGY_FEED.length}{" "}
          strategies
        </Text>
        {filteredFeed.length === 0 ? (
          <Text fontSize="sm" color="pm.muted" fontFamily={bodyFont}>
            No strategies match your search. Try different keywords or clear the
            tag filter.
          </Text>
        ) : (
          <StrategyFeedList items={filteredFeed} />
        )}
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
