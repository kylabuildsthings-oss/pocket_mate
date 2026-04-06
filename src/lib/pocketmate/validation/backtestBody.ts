import type { BacktestRequest } from "@/lib/build/types";
import { templateById } from "@/data/build/strategyTemplates";

/** Shared with `POST /api/pocketmate/backtest` — keep in sync with handler. */
export function validateBacktestBody(body: unknown): {
  ok: boolean;
  data?: BacktestRequest;
  errors?: string[];
} {
  if (!body || typeof body !== "object") {
    return { ok: false, errors: ["Body must be a JSON object"] };
  }
  const o = body as Record<string, unknown>;
  const templateId =
    typeof o.templateId === "string" ? o.templateId.trim() : "";
  if (!templateId) {
    return { ok: false, errors: ["templateId is required"] };
  }
  if (!templateById(templateId)) {
    return { ok: false, errors: [`Unknown templateId: ${templateId}`] };
  }
  const strategyName =
    typeof o.strategyName === "string" && o.strategyName.trim()
      ? String(o.strategyName).trim().slice(0, 120)
      : "Untitled strategy";
  const riskRaw = String(o.risk || "med");
  const risk: BacktestRequest["risk"] =
    riskRaw === "low" || riskRaw === "high" ? riskRaw : "med";
  const timeframe =
    typeof o.timeframe === "string" && o.timeframe.trim()
      ? String(o.timeframe).trim().slice(0, 16)
      : "1h";
  return { ok: true, data: { templateId, strategyName, risk, timeframe } };
}
