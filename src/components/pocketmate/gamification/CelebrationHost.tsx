"use client";

import { CelebrationBurst } from "@/components/pocketmate/learn/CelebrationBurst";
import type { CelebrationIntensity } from "@/lib/gamification/celebrationBus";
import { subscribeCelebration } from "@/lib/gamification/celebrationBus";
import { useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export function CelebrationHost() {
  const toast = useToast();
  const [burst, setBurst] = useState<{
    active: boolean;
    level: CelebrationIntensity;
  }>({
    active: false,
    level: "md",
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return subscribeCelebration((payload) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setBurst({ active: true, level: payload.intensity });
      timerRef.current = setTimeout(() => {
        setBurst((b) => ({ ...b, active: false }));
        timerRef.current = null;
      }, 1200);

      toast({
        title: payload.reason,
        status: "success",
        variant: "subtle",
        duration: 3200,
        isClosable: true,
      });
    });
  }, [toast]);

  return <CelebrationBurst active={burst.active} intensity={burst.level} />;
}
