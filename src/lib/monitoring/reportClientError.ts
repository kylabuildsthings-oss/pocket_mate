type ClientReportPayload = {
  source: string;
  message: string;
  digest?: string;
  path?: string;
  stack?: string;
};

let lastSent = 0;
const DEBOUNCE_MS = 2000;

/**
 * Best-effort client telemetry for error boundaries and critical UI failures.
 * Throttled to reduce noise from React re-renders.
 */
export function reportClientError(payload: ClientReportPayload): void {
  if (typeof window === "undefined") return;

  const now = Date.now();
  if (now - lastSent < DEBOUNCE_MS) return;
  lastSent = now;

  const path =
    payload.path ??
    (typeof window !== "undefined" ? window.location.pathname : "");

  void fetch("/api/pocketmate/client-log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: payload.source.slice(0, 80),
      message: payload.message.slice(0, 2000),
      digest: payload.digest?.slice(0, 120),
      path: path.slice(0, 200),
      stack: payload.stack?.slice(0, 4000),
    }),
  }).catch(() => {
    /* ignore — monitoring must not throw */
  });
}

export function reportClientMessage(source: string, message: string): void {
  reportClientError({
    source,
    message,
    path: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
}
