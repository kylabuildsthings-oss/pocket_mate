import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type BodyValidator<T = unknown> = (body: unknown) => {
  ok: boolean;
  data?: T;
  errors?: string[];
};

type SecureApiOptions<T = unknown> = {
  methods?: Array<"GET" | "POST" | "PUT" | "PATCH" | "DELETE">;
  rateLimit?: {
    windowMs: number;
    max: number;
  };
  auditEvent?: string;
  validateBody?: BodyValidator<T>;
};

type RateBucket = {
  count: number;
  resetAt: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __pocketmateRateLimitStore__: Map<string, RateBucket> | undefined;
}

const rateStore = global.__pocketmateRateLimitStore__ ?? new Map<string, RateBucket>();
if (!global.__pocketmateRateLimitStore__) {
  global.__pocketmateRateLimitStore__ = rateStore;
}

export function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (Array.isArray(forwarded)) return forwarded[0] || "unknown";
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket.remoteAddress || "unknown";
}

export function auditLog(
  req: NextApiRequest,
  event: string,
  details: Record<string, unknown> = {}
) {
  const payload = {
    ts: new Date().toISOString(),
    event,
    method: req.method,
    path: req.url,
    ip: getClientIp(req),
    ...details,
  };
  console.info(`[AUDIT] ${JSON.stringify(payload)}`);
}

function setApiSecurityHeaders(res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
}

function applyRateLimit(
  req: NextApiRequest,
  res: NextApiResponse,
  windowMs: number,
  max: number
) {
  const ip = getClientIp(req);
  const key = `${req.url || req.method || "unknown"}:${ip}`;
  const now = Date.now();
  const current = rateStore.get(key);

  if (!current || current.resetAt < now) {
    rateStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (current.count >= max) {
    const retryAfter = Math.ceil((current.resetAt - now) / 1000);
    res.setHeader("Retry-After", retryAfter.toString());
    res.status(429).json({ error: "Too many requests. Please try again shortly." });
    return false;
  }

  current.count += 1;
  rateStore.set(key, current);
  return true;
}

export function withSecureApi<T = unknown>(
  options: SecureApiOptions<T>,
  handler: NextApiHandler
): NextApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    setApiSecurityHeaders(res);

    if (options.methods && req.method && !options.methods.includes(req.method as any)) {
      res.setHeader("Allow", options.methods.join(", "));
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    if (options.rateLimit) {
      const allowed = applyRateLimit(
        req,
        res,
        options.rateLimit.windowMs,
        options.rateLimit.max
      );
      if (!allowed) return;
    }

    if (options.validateBody && req.method && ["POST", "PUT", "PATCH"].includes(req.method)) {
      const parsed = options.validateBody(req.body);
      if (!parsed.ok) {
        return res.status(400).json({
          error: "Invalid request body",
          details: parsed.errors || ["Unknown validation error"],
        });
      }
      req.body = parsed.data as any;
    }

    if (options.auditEvent) {
      auditLog(req, options.auditEvent);
    }

    try {
      return await handler(req, res);
    } catch (error) {
      console.error("Secure API handler failed:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export function validateRequiredFields(
  fields: string[]
): BodyValidator<Record<string, unknown>> {
  return (body: unknown) => {
    if (!body || typeof body !== "object") {
      return { ok: false, errors: ["Body must be a JSON object"] };
    }
    const input = body as Record<string, unknown>;
    const missing = fields.filter((field) => {
      const value = input[field];
      if (typeof value === "string") return value.trim() === "";
      return value === undefined || value === null;
    });
    if (missing.length > 0) {
      return { ok: false, errors: missing.map((f) => `Missing required field: ${f}`) };
    }
    return { ok: true, data: input };
  };
}

