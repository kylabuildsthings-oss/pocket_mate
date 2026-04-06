export type CelebrationIntensity = "sm" | "md" | "lg";

export type CelebrationPayload = {
  intensity: CelebrationIntensity;
  /** Short label for toasts / analytics */
  reason: string;
};

type Listener = (payload: CelebrationPayload) => void;

const listeners = new Set<Listener>();

export function subscribeCelebration(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function emitCelebration(payload: CelebrationPayload): void {
  listeners.forEach((fn) => {
    try {
      fn(payload);
    } catch {
      /* ignore listener errors */
    }
  });
}
