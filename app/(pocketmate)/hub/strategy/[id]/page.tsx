"use client";

import { CommentThread } from "@/components/pocketmate/community/CommentThread";
import { ReportAbuseModal } from "@/components/pocketmate/community/ReportAbuseModal";
import { PMBadge } from "@/components/pocketmate/PMBadge";
import { PMCard } from "@/components/pocketmate/PMCard";
import { feedPostById } from "@/data/community/feed";
import { copyFeedStrategyToLibrary } from "@/lib/community/copyStrategy";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function HubStrategyPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";
  const post = id ? feedPostById(id) : undefined;
  const toast = useToast();
  const router = useRouter();

  const onCopy = useCallback(() => {
    if (!post) return;
    const r = copyFeedStrategyToLibrary(post);
    if (!r.ok) {
      toast({
        title: "Could not copy",
        description: r.reason,
        status: "warning",
        duration: 3500,
      });
      return;
    }
    toast({
      title: "Strategy forked to library",
      description: "Open Build to tune and backtest.",
      status: "success",
      duration: 3200,
    });
    router.push("/build");
  }, [post, router, toast]);

  if (!post) {
    return (
      <VStack align="stretch" spacing={6} py={8}>
        <Heading size="md" color="pm.text">
          Strategy not found
        </Heading>
        <Text color="pm.muted">
          This feed id is not in the starter community list.
        </Text>
        <Button as={Link} href="/hub" colorScheme="purple" w="fit-content">
          Back to hub
        </Button>
      </VStack>
    );
  }

  return (
    <VStack align="stretch" spacing={6}>
      <Breadcrumb fontSize="sm" color="pm.muted">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/hub">
            Hub
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{post.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box
        display="flex"
        flexWrap="wrap"
        gap={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading size="md" color="pm.text">
          {post.title}
        </Heading>
        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
          <Button colorScheme="purple" size="sm" onClick={onCopy}>
            Copy to Build library
          </Button>
          <ReportAbuseModal
            targetType="strategy"
            targetId={post.id}
            label="Report strategy"
          />
        </Box>
      </Box>

      <PMCard>
        <VStack align="stretch" spacing={3}>
          <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
            <PMBadge tone="primary">{post.tag}</PMBadge>
            <Text fontSize="sm" color="pm.muted">
              {post.author} · {post.university} · updated {post.updatedAt}
            </Text>
          </Box>
          <Text fontSize="sm" color="pm.muted" lineHeight="short">
            {post.summary}
          </Text>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3}>
            <Text fontSize="sm" color="pm.text">
              Sim return <strong>{post.simulatedReturnPct}%</strong>
            </Text>
            <Text fontSize="sm" color="pm.text">
              Sharpe <strong>{post.simulatedSharpe}</strong>
            </Text>
            <Text fontSize="sm" color="pm.text">
              Template <strong>{post.templateId}</strong>
            </Text>
          </SimpleGrid>
        </VStack>
      </PMCard>

      <PMCard>
        <CommentThread strategyId={post.id} />
      </PMCard>
    </VStack>
  );
}
