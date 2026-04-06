"use client";

import type { LessonQuiz } from "@/lib/learn/types";
import { emitCelebration } from "@/lib/gamification/celebrationBus";
import { useGamificationStore } from "@/store/gamification/useGamificationStore";
import { useLearnStore } from "@/store/learn/useLearnStore";
import {
  Button,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useState } from "react";

type Selections = Record<string, number>;

export function LessonQuizPanel({
  quiz,
  lessonId,
}: {
  quiz: LessonQuiz;
  lessonId: string;
}) {
  const submitQuizAttempt = useLearnStore((s) => s.submitQuizAttempt);
  const passedAlready = useLearnStore((s) =>
    Boolean(s.passedQuizByLessonId[lessonId])
  );
  const attempts = useLearnStore(
    (s) => s.quizAttemptsByLessonId[lessonId] ?? []
  );

  const [selections, setSelections] = useState<Selections>({});
  const [submitted, setSubmitted] = useState(false);
  const [lastScore, setLastScore] = useState<{
    correct: number;
    total: number;
    passed: boolean;
  } | null>(null);

  const allAnswered = quiz.questions.every(
    (q) => selections[q.id] !== undefined
  );

  const handleSubmit = () => {
    if (!allAnswered || submitted) return;
    const wasPassedBefore =
      useLearnStore.getState().passedQuizByLessonId[lessonId];
    let correct = 0;
    for (const q of quiz.questions) {
      if (selections[q.id] === q.correctIndex) correct += 1;
    }
    const { passed, newBadges } = submitQuizAttempt(
      lessonId,
      correct,
      quiz.questions.length,
      quiz.passPct,
      quiz.xpReward
    );
    setLastScore({ correct, total: quiz.questions.length, passed });
    setSubmitted(true);
    if (passed && !wasPassedBefore) {
      const gameBadges = useGamificationStore
        .getState()
        .recomputeBadges({ silent: true });
      const big = newBadges.length > 0 || gameBadges.length > 0;
      emitCelebration({
        intensity: newBadges.length > 0 ? "lg" : big ? "md" : "sm",
        reason:
          newBadges.length > 0
            ? "Academy badge unlocked"
            : gameBadges.length > 0
            ? "Progress badge unlocked"
            : "Quiz passed — XP earned",
      });
    }
  };

  const handleRetry = () => {
    setSelections({});
    setSubmitted(false);
    setLastScore(null);
  };

  return (
    <VStack align="stretch" spacing={6}>
      <Text fontWeight="semibold" color="pm.text">
        Lesson quiz
      </Text>
      <Text fontSize="sm" color="pm.muted">
        Pass at {quiz.passPct}% or higher. You can retry any time. XP is awarded
        the first time you pass.
      </Text>

      {passedAlready ? (
        <Text fontSize="sm" color="green.300">
          You have already passed this quiz. Practice again for retention—XP was
          granted once.
        </Text>
      ) : null}

      {quiz.questions.map((q, idx) => (
        <VStack key={q.id} align="stretch" spacing={3}>
          <Text color="pm.text" fontWeight="medium">
            {idx + 1}. {q.prompt}
          </Text>
          <RadioGroup
            value={
              selections[q.id] !== undefined ? String(selections[q.id]) : ""
            }
            onChange={(val) => {
              if (submitted) return;
              setSelections((prev) => ({
                ...prev,
                [q.id]: Number.parseInt(val, 10),
              }));
            }}
          >
            <Stack spacing={2}>
              {q.choices.map((c, ci) => (
                <Radio
                  key={c}
                  value={String(ci)}
                  colorScheme="purple"
                  isDisabled={submitted}
                  borderColor="pm.border"
                >
                  <Text as="span" color="pm.muted" fontSize="sm">
                    {c}
                  </Text>
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </VStack>
      ))}

      <Wrap spacing={3}>
        {!submitted ? (
          <Button
            colorScheme="purple"
            onClick={handleSubmit}
            isDisabled={!allAnswered}
          >
            Submit answers
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              borderColor="pm.border"
              color="pm.text"
              onClick={handleRetry}
            >
              Retry quiz
            </Button>
            {lastScore ? (
              <Text
                alignSelf="center"
                color={lastScore.passed ? "green.300" : "orange.300"}
              >
                Score: {lastScore.correct}/{lastScore.total}
                {lastScore.passed ? " — Passed" : " — Not yet passing"}
                {lastScore.passed
                  ? ` · +${quiz.xpReward} XP (first pass only)`
                  : ""}
              </Text>
            ) : null}
          </>
        )}
      </Wrap>

      {attempts.length > 0 ? (
        <Text fontSize="xs" color="pm.muted">
          Attempts logged locally: {attempts.length}
        </Text>
      ) : null}
    </VStack>
  );
}
