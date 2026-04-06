export type ClientLogBody = {
  source: string;
  message: string;
  digest?: string;
  path?: string;
  stack?: string;
};

export function validateClientLogBody(body: unknown): {
  ok: boolean;
  data?: ClientLogBody;
  errors?: string[];
} {
  if (!body || typeof body !== "object") {
    return { ok: false, errors: ["Body must be a JSON object"] };
  }
  const o = body as Record<string, unknown>;
  const source =
    typeof o.source === "string" ? o.source.trim().slice(0, 80) : "";
  const message =
    typeof o.message === "string" ? o.message.trim().slice(0, 2000) : "";
  if (!source || !message) {
    return { ok: false, errors: ["source and message are required"] };
  }
  const digest =
    typeof o.digest === "string" ? o.digest.trim().slice(0, 120) : undefined;
  const path =
    typeof o.path === "string" ? o.path.trim().slice(0, 200) : undefined;
  const stack =
    typeof o.stack === "string" ? o.stack.slice(0, 4000) : undefined;
  return { ok: true, data: { source, message, digest, path, stack } };
}
