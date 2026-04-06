"use client";

import { PMCard } from "@/components/pocketmate/PMCard";
import { PMBadge } from "@/components/pocketmate/PMBadge";
import { PMStat } from "@/components/pocketmate/PMStat";
import { LESSONS } from "@/data/learn/lessons";
import { useTotalXp } from "@/hooks/useTotalXp";
import { useGamificationStore } from "@/store/gamification/useGamificationStore";
import { useLearnStore } from "@/store/learn/useLearnStore";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

export default function LearnPage() {
  const completedLessonIds = useLearnStore((s) => s.completedLessonIds);
  const passedQuizByLessonId = useLearnStore((s) => s.passedQuizByLessonId);
  const xp = useLearnStore((s) => s.xp);
  const badgeIds = useLearnStore((s) => s.badgeIds);
  const campusBadgeIds = useGamificationStore((s) => s.badgeIds);
  const resetProgress = useLearnStore((s) => s.resetProgress);
  const resetGamification = useGamificationStore((s) => s.reset);
  const totalXp = useTotalXp();

  const sorted = [...LESSONS].sort((a, b) => a.order - b.order);
  const completedCount = completedLessonIds.length;
  const quizPassedCount = Object.keys(passedQuizByLessonId).length;

  return (
    <VStack align="stretch" spacing={8}>
      <VStack align="start" spacing={2}>
        <Heading
          size="lg"
          fontFamily="var(--font-pm-heading), system-ui, sans-serif"
          color="pm.text"
        >
          Learn
        </Heading>
        <Text color="pm.muted" maxW="3xl">
          Ten starter lessons with glossary-linked terms, a short quiz each, and
          local progress. XP and badges unlock as you go—data stays in your
          browser until a future account layer ships.
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        <PMStat
          label="Learn XP"
          value={String(xp)}
          hint="Lessons + quizzes (see Profile for total incl. activity)"
        />
        <PMStat
          label="Total XP"
          value={String(totalXp)}
          hint="Learn + activity (levels)"
        />
        <PMStat
          label="Lessons done"
          value={`${completedCount}/${sorted.length}`}
          hint="Mark complete on each page"
        />
        <PMStat
          label="Quizzes passed"
          value={`${quizPassedCount}/${sorted.length}`}
          hint="Pass ≥ quiz threshold"
        />
        <PMStat
          label="Badges"
          value={String(badgeIds.length + campusBadgeIds.length)}
          hint="Academy + campus (details on Profile)"
        />
      </SimpleGrid>

      {badgeIds.length > 0 ? (
        <PMCard>
          <Text fontWeight="semibold" color="pm.text" mb={3}>
            Unlocked badges
          </Text>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {badgeIds.map((id) => {
              const labels: Record<string, string> = {
                "first-lesson": "First steps",
                "first-quiz": "Quiz starter",
                "half-scholar": "Half scholar",
                "quiz-ace-five": "On a roll",
                graduate: "Academy graduate",
              };
              return (
                <PMBadge key={id} tone="primary">
                  {labels[id] ?? id}
                </PMBadge>
              );
            })}
          </Box>
        </PMCard>
      ) : null}

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {sorted.map((lesson) => {
          const done = completedLessonIds.includes(lesson.id);
          const quizOk = Boolean(passedQuizByLessonId[lesson.id]);
          return (
            <Link key={lesson.id} href={`/learn/${lesson.slug}`}>
              <PMCard h="full" cursor="pointer">
                <VStack align="stretch" spacing={3}>
                  <Box
                    display="flex"
                    flexWrap="wrap"
                    gap={2}
                    alignItems="center"
                  >
                    <Text fontWeight="bold" color="pm.text">
                      {lesson.order}. {lesson.title}
                    </Text>
                    {done ? <PMBadge tone="success">Read</PMBadge> : null}
                    {quizOk ? <PMBadge tone="primary">Quiz</PMBadge> : null}
                  </Box>
                  <Text fontSize="sm" color="pm.muted">
                    {lesson.summary}
                  </Text>
                  <Text fontSize="xs" color="pm.muted">
                    ~{lesson.estMinutes} min
                  </Text>
                </VStack>
              </PMCard>
            </Link>
          );
        })}
      </SimpleGrid>

      <Box>
        <Button
          size="sm"
          variant="ghost"
          color="pm.muted"
          onClick={() => {
            resetProgress();
            resetGamification();
          }}
        >
          Reset local learn + gamification (dev / fresh start)
        </Button>
      </Box>
    </VStack>
  );
}
