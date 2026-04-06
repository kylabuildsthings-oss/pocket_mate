import { describe, expect, it } from "vitest";

import {
  canPostNow,
  enforceCommentBudget,
  moderateCommentBody,
  COMMENT_COOLDOWN_MS,
} from "./moderation";

describe("moderation", () => {
  it("rejects short comments", () => {
    expect(moderateCommentBody("a")).toEqual({
      ok: false,
      reason: "Comment is too short.",
    });
  });

  it("blocks phishing-like patterns", () => {
    expect(moderateCommentBody("Please wallet connect verify")).toEqual({
      ok: false,
      reason: "This message matches a blocked pattern (phishing / secrets).",
    });
  });

  it("accepts normal text", () => {
    expect(moderateCommentBody("Good explanation of funding rates.")).toEqual({
      ok: true,
    });
  });

  it("enforces cooldown", () => {
    const now = 1_000_000;
    expect(canPostNow(now - 1000, now)).toEqual({
      ok: false,
      reason: "Please wait a few seconds between posts.",
    });
    expect(canPostNow(now - COMMENT_COOLDOWN_MS - 1, now)).toEqual({
      ok: true,
    });
  });

  it("enforces thread budget", () => {
    expect(enforceCommentBudget(40)).toEqual({
      ok: false,
      reason: "Thread limit reached for this MVP (local storage).",
    });
    expect(enforceCommentBudget(3)).toEqual({ ok: true });
  });
});
