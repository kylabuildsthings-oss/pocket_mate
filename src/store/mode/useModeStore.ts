"use client";

import { create } from "zustand";

export type PocketMateMode = "demo" | "live";

type ModeRequestResult = {
  switched: boolean;
  requiresConfirmation?: boolean;
  reason?: "locked" | "already-active";
};

type ModeState = {
  mode: PocketMateMode;
  hasConfirmedLiveRisk: boolean;
  isActionLocked: boolean;
  lastSwitchedAt: number | null;
  requestMode: (nextMode: PocketMateMode) => ModeRequestResult;
  confirmAndSwitchToLive: () => ModeRequestResult;
  setActionLock: (locked: boolean) => void;
  resetMode: () => void;
};

export const useModeStore = create<ModeState>((set, get) => ({
  mode: "demo",
  hasConfirmedLiveRisk: false,
  isActionLocked: false,
  lastSwitchedAt: null,

  requestMode: (nextMode) => {
    const { mode, hasConfirmedLiveRisk, isActionLocked } = get();

    if (isActionLocked) {
      return { switched: false, reason: "locked" };
    }

    if (mode === nextMode) {
      return { switched: false, reason: "already-active" };
    }

    if (nextMode === "live" && !hasConfirmedLiveRisk) {
      return { switched: false, requiresConfirmation: true };
    }

    set({ mode: nextMode, lastSwitchedAt: Date.now() });
    return { switched: true };
  },

  confirmAndSwitchToLive: () => {
    const { isActionLocked } = get();
    if (isActionLocked) {
      return { switched: false, reason: "locked" };
    }

    set({
      hasConfirmedLiveRisk: true,
      mode: "live",
      lastSwitchedAt: Date.now(),
    });
    return { switched: true };
  },

  setActionLock: (locked) => set({ isActionLocked: locked }),

  resetMode: () =>
    set({
      mode: "demo",
      hasConfirmedLiveRisk: false,
      isActionLocked: false,
      lastSwitchedAt: null,
    }),
}));
