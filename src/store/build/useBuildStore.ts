"use client";

import type {
  BacktestResult,
  SavedStrategy,
  SimulatedDeployment,
} from "@/lib/build/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const STORAGE_KEY = "pocketmate-build-v1";

function id(prefix: string): string {
  return `${prefix}_${Math.random()
    .toString(36)
    .slice(2, 10)}${Date.now().toString(36)}`;
}

type BuildState = {
  saved: SavedStrategy[];
  deployments: SimulatedDeployment[];
  backtestRuns: { at: number; result: BacktestResult }[];
  saveStrategy: (
    draft: Omit<SavedStrategy, "id" | "updatedAt"> & { id?: string }
  ) => SavedStrategy;
  cloneStrategy: (strategyId: string) => SavedStrategy | null;
  deploySimulated: (strategyId: string) => SimulatedDeployment | null;
  pushRunLog: (result: BacktestResult) => void;
  resetBuild: () => void;
};

export const useBuildStore = create<BuildState>()(
  persist(
    (set, get) => ({
      saved: [],
      deployments: [],
      backtestRuns: [],

      saveStrategy: (draft) => {
        const now = Date.now();
        const entry: SavedStrategy = {
          id: draft.id ?? id("strat"),
          name: draft.name,
          templateId: draft.templateId,
          notes: draft.notes,
          risk: draft.risk,
          timeframe: draft.timeframe,
          updatedAt: now,
          lastBacktest: draft.lastBacktest,
        };
        set((s) => ({
          saved: [entry, ...s.saved.filter((x) => x.id !== entry.id)].slice(
            0,
            40
          ),
        }));
        return entry;
      },

      cloneStrategy: (strategyId) => {
        const src = get().saved.find((x) => x.id === strategyId);
        if (!src) return null;
        const copy: SavedStrategy = {
          ...src,
          id: id("strat"),
          name: `${src.name} (copy)`,
          updatedAt: Date.now(),
          lastBacktest: src.lastBacktest,
        };
        set((s) => ({ saved: [copy, ...s.saved].slice(0, 40) }));
        return copy;
      },

      deploySimulated: (strategyId) => {
        const src = get().saved.find((x) => x.id === strategyId);
        if (!src) return null;
        const dep: SimulatedDeployment = {
          id: id("dep"),
          strategyId: src.id,
          name: src.name,
          at: Date.now(),
          status: "simulated-live",
        };
        set((s) => ({ deployments: [dep, ...s.deployments].slice(0, 50) }));
        return dep;
      },

      pushRunLog: (result) => {
        set((s) => ({
          backtestRuns: [{ at: Date.now(), result }, ...s.backtestRuns].slice(
            0,
            60
          ),
        }));
      },

      resetBuild: () =>
        set({
          saved: [],
          deployments: [],
          backtestRuns: [],
        }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
