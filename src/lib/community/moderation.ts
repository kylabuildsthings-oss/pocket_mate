const BANNED = [
  /wallet\s*connect\s*verify/i,
  /seed\s*phrase/i,
  /^\s*https?:\/\/\S+\s*$/i,
];

const MAX_LEN = 480;
const COOLDOWN_MS = 8_000;
const MAX_COMMENTS_PER_STRATEGY = 40;

export type ModerationResult = { ok: true } | { ok: false; reason: string };

export function moderateCommentBody(body: string): ModerationResult {
  const t = body.trim();
  if (t.length < 2) {
    return { ok: false, reason: "Comment is too short." };
  }
  if (t.length > MAX_LEN) {
    return { ok: false, reason: `Keep comments under ${MAX_LEN} characters.` };
  }
  for (const re of BANNED) {
    if (re.test(t)) {
      return {
        ok: false,
        reason: "This message matches a blocked pattern (phishing / secrets).",
      };
    }
  }
  return { ok: true };
}

export function canPostNow(
  lastPostAt: number | null,
  now = Date.now()
): ModerationResult {
  if (lastPostAt != null && now - lastPostAt < COOLDOWN_MS) {
    return { ok: false, reason: "Please wait a few seconds between posts." };
  }
  return { ok: true };
}

export function enforceCommentBudget(count: number): ModerationResult {
  if (count >= MAX_COMMENTS_PER_STRATEGY) {
    return {
      ok: false,
      reason: "Thread limit reached for this MVP (local storage).",
    };
  }
  return { ok: true };
}

export { MAX_LEN as COMMENT_MAX_LEN, COOLDOWN_MS as COMMENT_COOLDOWN_MS };
