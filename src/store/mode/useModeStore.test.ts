import { beforeEach, describe, expect, it } from "vitest";

import { useModeStore } from "./useModeStore";

describe("useModeStore", () => {
  beforeEach(() => {
    useModeStore.getState().resetMode();
  });

  it("defaults to demo", () => {
    expect(useModeStore.getState().mode).toBe("demo");
  });

  it("requires confirmation before first live switch", () => {
    const r = useModeStore.getState().requestMode("live");
    expect(r.switched).toBe(false);
    expect(r.requiresConfirmation).toBe(true);
    expect(useModeStore.getState().mode).toBe("demo");
  });

  it("confirmAndSwitchToLive enables live", () => {
    useModeStore.getState().confirmAndSwitchToLive();
    expect(useModeStore.getState().mode).toBe("live");
    expect(useModeStore.getState().hasConfirmedLiveRisk).toBe(true);
  });

  it("blocks switch when action locked", () => {
    useModeStore.getState().setActionLock(true);
    expect(useModeStore.getState().requestMode("live")).toMatchObject({
      switched: false,
      reason: "locked",
    });
  });
});
