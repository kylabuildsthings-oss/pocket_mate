export type ReportBody = {
  targetType: "strategy" | "comment";
  targetId: string;
  reason: string;
};

/** Shared with `POST /api/pocketmate/report` — keep in sync with handler. */
export function validateReportBody(body: unknown): {
  ok: boolean;
  data?: ReportBody;
  errors?: string[];
} {
  if (!body || typeof body !== "object") {
    return { ok: false, errors: ["Body must be a JSON object"] };
  }
  const o = body as Record<string, unknown>;
  const targetType =
    o.targetType === "comment"
      ? "comment"
      : o.targetType === "strategy"
      ? "strategy"
      : "";
  if (targetType !== "strategy" && targetType !== "comment") {
    return { ok: false, errors: ["targetType must be strategy or comment"] };
  }
  const targetId = typeof o.targetId === "string" ? o.targetId.trim() : "";
  if (!targetId || targetId.length > 120) {
    return { ok: false, errors: ["targetId invalid"] };
  }
  const reason = typeof o.reason === "string" ? o.reason.trim() : "";
  if (reason.length < 8) {
    return {
      ok: false,
      errors: ["Please add a bit more detail (min 8 characters)."],
    };
  }
  if (reason.length > 2000) {
    return { ok: false, errors: ["Reason too long (max 2000 characters)."] };
  }
  return { ok: true, data: { targetType, targetId, reason } };
}
