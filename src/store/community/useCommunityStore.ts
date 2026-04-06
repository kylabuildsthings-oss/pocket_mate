"use client";

import type { CommunityComment } from "@/lib/community/types";
import {
  canPostNow,
  enforceCommentBudget,
  moderateCommentBody,
} from "@/lib/community/moderation";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const STORAGE_KEY = "pocketmate-community-v1";

function cid(): string {
  return `c_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

type VoteDir = "up" | "down";

type CommunityState = {
  comments: CommunityComment[];
  /** One vote per comment for this device */
  commentVotes: Record<string, VoteDir>;
  lastPostAt: number | null;
  addComment: (
    strategyId: string,
    body: string,
    parentId: string | null
  ) => { ok: true } | { ok: false; reason: string };
  voteComment: (commentId: string, dir: VoteDir) => void;
  resetCommunity: () => void;
};

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set, get) => ({
      comments: [],
      commentVotes: {},
      lastPostAt: null,

      addComment: (strategyId, body, parentId) => {
        const mod = moderateCommentBody(body);
        if (!mod.ok) return mod;

        const cool = canPostNow(get().lastPostAt);
        if (!cool.ok) return cool;

        const thread = get().comments.filter(
          (c) => c.strategyId === strategyId
        );
        const budget = enforceCommentBudget(thread.length);
        if (!budget.ok) return budget;

        const trimmed = body.trim();

        if (parentId) {
          const parent = get().comments.find((c) => c.id === parentId);
          if (!parent || parent.strategyId !== strategyId) {
            return { ok: false, reason: "Reply target not found." };
          }
          if (parent.parentId !== null) {
            return {
              ok: false,
              reason: "One level of replies only in this MVP.",
            };
          }
        }

        const comment: CommunityComment = {
          id: cid(),
          strategyId,
          parentId,
          author: "You",
          body: trimmed,
          score: 1,
          createdAt: Date.now(),
        };

        set((s) => ({
          comments: [...s.comments, comment],
          lastPostAt: Date.now(),
        }));

        return { ok: true };
      },

      voteComment: (commentId, dir) => {
        const prev = get().commentVotes[commentId];
        if (prev === dir) return;

        set((s) => {
          const comments = s.comments.map((c) => {
            if (c.id !== commentId) return c;
            let nextScore = c.score;
            if (!prev && dir === "up") nextScore += 1;
            else if (!prev && dir === "down") nextScore -= 1;
            else if (prev === "up" && dir === "down") nextScore -= 2;
            else if (prev === "down" && dir === "up") nextScore += 2;
            return { ...c, score: nextScore };
          });
          return {
            comments,
            commentVotes: { ...s.commentVotes, [commentId]: dir },
          };
        });
      },

      resetCommunity: () =>
        set({
          comments: [],
          commentVotes: {},
          lastPostAt: null,
        }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
