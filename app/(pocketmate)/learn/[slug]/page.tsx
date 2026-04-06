"use client";

import { LessonBody } from "@/components/pocketmate/learn/LessonBody";
import { LessonQuizPanel } from "@/components/pocketmate/learn/LessonQuizPanel";
import { PMCard } from "@/components/pocketmate/PMCard";
import { lessonBySlug } from "@/data/learn/lessons";
import { quizForLesson } from "@/data/learn/quizzes";
import { emitCelebration } from "@/lib/gamification/celebrationBus";
import { useGamificationStore } from "@/store/gamification/useGamificationStore";
import { useLearnStore } from "@/store/learn/useLearnStore";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function LearnLessonPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const lesson = lessonBySlug(slug);
  const quiz = lesson ? quizForLesson(lesson.id) : undefined;
  const markLessonComplete = useLearnStore((s) => s.markLessonComplete);
  const completedLessonIds = useLearnStore((s) => s.completedLessonIds);

  if (!lesson || !quiz) {
    return (
      <VStack align="stretch" spacing={6} py={8}>
        <Heading size="md" color="pm.text">
          Lesson not found
        </Heading>
        <Text color="pm.muted">
          This slug does not match a starter lesson. Return to the academy index
          and pick a card.
        </Text>
        <Button as={Link} href="/learn" colorScheme="purple" w="fit-content">
          Back to Learn
        </Button>
      </VStack>
    );
  }

  const isComplete = completedLessonIds.includes(lesson.id);

  return (
    <VStack align="stretch" spacing={8}>
      <Breadcrumb fontSize="sm" color="pm.muted" separator="›">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/learn">
            Learn
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{lesson.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <VStack align="start" spacing={2}>
        <Heading
          size="lg"
          fontFamily="var(--font-pm-heading), system-ui, sans-serif"
          color="pm.text"
        >
          {lesson.order}. {lesson.title}
        </Heading>
        <Text color="pm.muted" maxW="3xl">
          {lesson.summary} — about {lesson.estMinutes} minutes.
        </Text>
      </VStack>

      <PMCard>
        <LessonBody blocks={lesson.blocks} />
        <Box mt={8}>
          <Button
            colorScheme="purple"
            variant={isComplete ? "outline" : "solid"}
            borderColor="pm.border"
            isDisabled={isComplete}
            onClick={() => {
              const { xpGained, newBadges } = markLessonComplete(lesson.id);
              const gameBadges = useGamificationStore
                .getState()
                .recomputeBadges({ silent: true });
              if (
                xpGained > 0 ||
                newBadges.length > 0 ||
                gameBadges.length > 0
              ) {
                emitCelebration({
                  intensity:
                    newBadges.length > 0
                      ? "lg"
                      : gameBadges.length > 0
                      ? "md"
                      : "sm",
                  reason: newBadges.length
                    ? "Academy badge unlocked"
                    : gameBadges.length
                    ? "Progress badge unlocked"
                    : "+10 XP · lesson complete",
                });
              }
            }}
          >
            {isComplete
              ? "Lesson marked complete"
              : "Mark lesson complete (+10 XP)"}
          </Button>
        </Box>
      </PMCard>

      <PMCard>
        <LessonQuizPanel lessonId={lesson.id} quiz={quiz} />
      </PMCard>
    </VStack>
  );
}
