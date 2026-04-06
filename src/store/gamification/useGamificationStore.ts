"use client";

import { emitCelebration } from "@/lib/gamification/celebrationBus";
import { levelFromTotalXp } from "@/lib/gamification/xpEngine";
import { useLearnStore } from "@/store/learn/useLearnStore";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const STORAGE_KEY = "pocketmate-gamification-v1";

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function daysBetween(prevYmd: string, nextYmd: string): number {
  const t0 = new Date(`${prevYmd}T12:00:00.000Z`).getTime();
  const t1 = new Date(`${nextYmd}T12:00:00.000Z`).getTime();
  return Math.round((t1 - t0) / (24 * 60 * 60 * 1000));
}

function uniquePushMany(list: string[], ids: string[]): string[] {
  let out = list;
  for (const id of ids) {
    if (!out.includes(id)) out = [...out, id];
  }
  return out;
}

function evaluateNewGameBadges(slice: {
  activityXp: number;
  streakDays: number;
  paperTradesCount: number;
  backtestsRun: number;
  badgeIds: string[];
}): string[] {
  const learnXp = useLearnStore.getState().xp;
  const total = learnXp + slice.activityXp;
  const level = levelFromTotalXp(total);
  const candidates = [
    { id: "streak-3", ok: slice.streakDays >= 3 },
    { id: "streak-7", ok: slice.streakDays >= 7 },
    { id: "xp-250", ok: total >= 250 },
    { id: "xp-500", ok: total >= 500 },
    { id: "level-5", ok: level >= 5 },
    { id: "level-8", ok: level >= 8 },
    { id: "sim-3", ok: slice.paperTradesCount >= 3 },
    { id: "backtest-1", ok: slice.backtestsRun >= 1 },
  ];
  const next: string[] = [];
  for (const c of candidates) {
    if (c.ok && !slice.badgeIds.includes(c.id)) next.push(c.id);
  }
  return next;
}

function emitForBadges(newBadgeIds: string[]) {
  if (newBadgeIds.length === 0) return;
  emitCelebration({
    intensity: newBadgeIds.length > 2 ? "lg" : "md",
    reason: `Badge unlocked`,
  });
}

type GamificationState = {
  activityXp: number;
  lastActiveYmd: string | null;
  streakDays: number;
  paperTradesCount: number;
  backtestsRun: number;
  badgeIds: string[];
  recordVisit: () => void;
  awardActivityXp: (amount: number, reason: string) => void;
  recordSimulatedTrade: () => void;
  recordMockBacktest: () => void;
  recomputeBadges: (opts?: { silent?: boolean }) => string[];
  reset: () => void;
};

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set) => {
      const recomputeImpl = (opts?: { silent?: boolean }) => {
        let fresh: string[] = [];
        set((s) => {
          const nb = evaluateNewGameBadges({
            activityXp: s.activityXp,
            streakDays: s.streakDays,
            paperTradesCount: s.paperTradesCount,
            backtestsRun: s.backtestsRun,
            badgeIds: s.badgeIds,
          });
          if (nb.length === 0) return s;
          fresh = nb;
          if (!opts?.silent) emitForBadges(nb);
          return { ...s, badgeIds: uniquePushMany(s.badgeIds, nb) };
        });
        return fresh;
      };

      return {
        activityXp: 0,
        lastActiveYmd: null,
        streakDays: 0,
        paperTradesCount: 0,
        backtestsRun: 0,
        badgeIds: [],

        recordVisit: () => {
          const today = ymd(new Date());
          set((s) => {
            if (s.lastActiveYmd === today) {
              const nb = evaluateNewGameBadges({
                activityXp: s.activityXp,
                streakDays: s.streakDays,
                paperTradesCount: s.paperTradesCount,
                backtestsRun: s.backtestsRun,
                badgeIds: s.badgeIds,
              });
              if (nb.length === 0) return s;
              emitForBadges(nb);
              return { ...s, badgeIds: uniquePushMany(s.badgeIds, nb) };
            }

            let streakDays = 1;
            if (s.lastActiveYmd) {
              const diff = daysBetween(s.lastActiveYmd, today);
              if (diff === 1) streakDays = s.streakDays + 1;
              else if (diff > 1) streakDays = 1;
              else streakDays = s.streakDays;
            }

            const activityXp = s.activityXp + 5;
            const nb = evaluateNewGameBadges({
              activityXp,
              streakDays,
              paperTradesCount: s.paperTradesCount,
              backtestsRun: s.backtestsRun,
              badgeIds: s.badgeIds,
            });
            const badgeIds = uniquePushMany(s.badgeIds, nb);
            if (nb.length) emitForBadges(nb);
            return {
              ...s,
              lastActiveYmd: today,
              streakDays,
              activityXp,
              badgeIds,
            };
          });
        },

        awardActivityXp: (amount, reason) => {
          if (amount <= 0) return;
          set((s) => {
            const activityXp = s.activityXp + amount;
            const nb = evaluateNewGameBadges({
              activityXp,
              streakDays: s.streakDays,
              paperTradesCount: s.paperTradesCount,
              backtestsRun: s.backtestsRun,
              badgeIds: s.badgeIds,
            });
            const badgeIds = uniquePushMany(s.badgeIds, nb);
            if (nb.length) emitForBadges(nb);
            emitCelebration({ intensity: "sm", reason });
            return { ...s, activityXp, badgeIds };
          });
        },

        recordSimulatedTrade: () => {
          set((s) => {
            const paperTradesCount = s.paperTradesCount + 1;
            const activityXp = s.activityXp + 15;
            const nb = evaluateNewGameBadges({
              activityXp,
              streakDays: s.streakDays,
              paperTradesCount,
              backtestsRun: s.backtestsRun,
              badgeIds: s.badgeIds,
            });
            const badgeIds = uniquePushMany(s.badgeIds, nb);
            if (nb.length) emitForBadges(nb);
            emitCelebration({
              intensity: "sm",
              reason: "+15 XP · simulated trade",
            });
            return { ...s, paperTradesCount, activityXp, badgeIds };
          });
        },

        recordMockBacktest: () => {
          set((s) => {
            const backtestsRun = s.backtestsRun + 1;
            const activityXp = s.activityXp + 20;
            const nb = evaluateNewGameBadges({
              activityXp,
              streakDays: s.streakDays,
              paperTradesCount: s.paperTradesCount,
              backtestsRun,
              badgeIds: s.badgeIds,
            });
            const badgeIds = uniquePushMany(s.badgeIds, nb);
            if (nb.length) emitForBadges(nb);
            emitCelebration({
              intensity: "sm",
              reason: "+20 XP · mock backtest",
            });
            return { ...s, backtestsRun, activityXp, badgeIds };
          });
        },

        recomputeBadges: (opts) => recomputeImpl(opts),

        reset: () =>
          set({
            activityXp: 0,
            lastActiveYmd: null,
            streakDays: 0,
            paperTradesCount: 0,
            backtestsRun: 0,
            badgeIds: [],
          }),
      };
    },
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
