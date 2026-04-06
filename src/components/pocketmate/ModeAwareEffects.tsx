"use client";

import { useEffect } from "react";
import { useModeStore } from "@/store/mode/useModeStore";

export function ModeAwareEffects() {
  const mode = useModeStore((state) => state.mode);

  useEffect(() => {
    document.documentElement.dataset.pmMode = mode;
  }, [mode]);

  return null;
}
