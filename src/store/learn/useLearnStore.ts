"use client";

import { LESSONS } from "@/data/learn/lessons";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const STORAGE_KEY = "pocketmate-learn-progress-v1";

export type QuizAttemptRecord = {
  correct: number;
  total: number;
  passed: boolean;
  at: number;
};

export type LearnBadge = {
  id: string;
  title: string;
  description: string;
};

export const LEARN_BADGES: LearnBadge[] = [
  {
    id: "first-lesson",
    title: "First steps",
    description: "Completed your first lesson.",
  },
  {
    id: "first-quiz",
    title: "Quiz starter",
    description: "Passed your first lesson quiz.",
  },
  {
    id: "half-scholar",
    title: "Half scholar",
    description: "Completed five lessons.",
  },
  {
    id: "quiz-ace-five",
    title: "On a roll",
    description: "Passed five lesson quizzes.",
  },
  {
    id: "graduate",
    title: "Academy graduate",
    description: "Finished all lessons and passed every quiz.",
  },
];

type LearnState = {
  completedLessonIds: string[];
  passedQuizByLessonId: Record<string, true>;
  quizAttemptsByLessonId: Record<string, QuizAttemptRecord[]>;
  xp: number;
  badgeIds: string[];
  markLessonComplete: (lessonId: string) => {
    xpGained: number;
    newBadges: string[];
  };
  submitQuizAttempt: (
    lessonId: string,
    correct: number,
    total: number,
    passPct: number,
    xpReward: number
  ) => { passed: boolean; xpGained: number; newBadges: string[] };
  resetProgress: () => void;
};

function uniquePush(list: string[], id: string): string[] {
  if (list.includes(id)) return list;
  return [...list, id];
}

function evaluateNewBadges(state: {
  completedLessonIds: string[];
  passedQuizByLessonId: Record<string, true>;
  badgeIds: string[];
}): string[] {
  const passedQuizCount = Object.keys(state.passedQuizByLessonId).length;
  const lessonCount = state.completedLessonIds.length;
  const allLessonsDone = LESSONS.every((l) =>
    state.completedLessonIds.includes(l.id)
  );
  const allQuizzesPassed = LESSONS.every((l) =>
    Boolean(state.passedQuizByLessonId[l.id])
  );

  const candidates: { id: string; ok: boolean }[] = [
    { id: "first-lesson", ok: lessonCount >= 1 },
    { id: "first-quiz", ok: passedQuizCount >= 1 },
    { id: "half-scholar", ok: lessonCount >= 5 },
    { id: "quiz-ace-five", ok: passedQuizCount >= 5 },
    { id: "graduate", ok: allLessonsDone && allQuizzesPassed },
  ];

  const next: string[] = [];
  for (const c of candidates) {
    if (c.ok && !state.badgeIds.includes(c.id)) {
      next.push(c.id);
    }
  }
  return next;
}

export const useLearnStore = create<LearnState>()(
  persist(
    (set) => ({
      completedLessonIds: [],
      passedQuizByLessonId: {},
      quizAttemptsByLessonId: {},
      xp: 0,
      badgeIds: [],

      markLessonComplete: (lessonId) => {
        let xpGained = 0;
        const newBadges: string[] = [];
        set((state) => {
          if (state.completedLessonIds.includes(lessonId)) {
            return state;
          }
          xpGained = 10;
          const completedLessonIds = uniquePush(
            state.completedLessonIds,
            lessonId
          );
          const draft = {
            completedLessonIds,
            passedQuizByLessonId: state.passedQuizByLessonId,
            badgeIds: state.badgeIds,
          };
          const nb = evaluateNewBadges(draft);
          newBadges.push(...nb);
          return {
            completedLessonIds,
            xp: state.xp + xpGained,
            badgeIds: uniquePushMany(state.badgeIds, nb),
          };
        });
        return { xpGained, newBadges };
      },

      submitQuizAttempt: (lessonId, correct, total, passPct, xpReward) => {
        const pct = total === 0 ? 0 : Math.round((100 * correct) / total);
        const passed = pct >= passPct;
        const attempt: QuizAttemptRecord = {
          correct,
          total,
          passed,
          at: Date.now(),
        };

        let xpGained = 0;
        const newBadges: string[] = [];

        set((state) => {
          const attempts = [
            ...(state.quizAttemptsByLessonId[lessonId] ?? []),
            attempt,
          ];
          const passedQuizByLessonId = { ...state.passedQuizByLessonId };
          if (passed && !passedQuizByLessonId[lessonId]) {
            passedQuizByLessonId[lessonId] = true;
            xpGained = xpReward;
          }

          const draft = {
            completedLessonIds: state.completedLessonIds,
            passedQuizByLessonId,
            badgeIds: state.badgeIds,
          };
          const nb = evaluateNewBadges(draft);
          newBadges.push(...nb);

          return {
            quizAttemptsByLessonId: {
              ...state.quizAttemptsByLessonId,
              [lessonId]: attempts,
            },
            passedQuizByLessonId,
            xp: state.xp + xpGained,
            badgeIds: uniquePushMany(state.badgeIds, nb),
          };
        });

        return { passed, xpGained, newBadges };
      },

      resetProgress: () =>
        set({
          completedLessonIds: [],
          passedQuizByLessonId: {},
          quizAttemptsByLessonId: {},
          xp: 0,
          badgeIds: [],
        }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        completedLessonIds: s.completedLessonIds,
        passedQuizByLessonId: s.passedQuizByLessonId,
        quizAttemptsByLessonId: s.quizAttemptsByLessonId,
        xp: s.xp,
        badgeIds: s.badgeIds,
      }),
    }
  )
);

function uniquePushMany(list: string[], ids: string[]): string[] {
  let out = list;
  for (const id of ids) {
    if (!out.includes(id)) out = [...out, id];
  }
  return out;
}
