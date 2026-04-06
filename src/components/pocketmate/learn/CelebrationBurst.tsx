"use client";

import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = [
  "#7c3aed",
  "#22c55e",
  "#38bdf8",
  "#fbbf24",
  "#f472b6",
  "#a78bfa",
];

type Particle = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
  delay: number;
};

function makeParticles(seed: number): Particle[] {
  const out: Particle[] = [];
  for (let i = 0; i < 18; i += 1) {
    const r = (((seed + i) * 9301 + 49297) % 233280) / 233280;
    const angle = r * Math.PI * 2;
    const dist = 80 + r * 120;
    out.push({
      id: i,
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 40,
      rotate: (r - 0.5) * 360,
      color: COLORS[i % COLORS.length],
      delay: r * 0.08,
    });
  }
  return out;
}

export function CelebrationBurst({
  active,
  intensity = "md",
}: {
  active: boolean;
  intensity?: "sm" | "md" | "lg";
}) {
  const particles = useMemo(() => {
    const seed = intensity === "lg" ? 99 : intensity === "sm" ? 11 : 42;
    return makeParticles(seed);
  }, [intensity]);

  return (
    <Box
      pointerEvents="none"
      position="fixed"
      zIndex={2000}
      left="50%"
      top="35%"
      w={0}
      h={0}
      aria-hidden
    >
      <AnimatePresence>
        {active ? (
          <>
            {particles.map((p) => (
              <motion.span
                key={p.id}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.4, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 0.9, 0],
                  x: p.x,
                  y: p.y,
                  scale: [0.4, 1, 0.6],
                  rotate: p.rotate,
                }}
                transition={{
                  duration:
                    intensity === "sm"
                      ? 0.85
                      : intensity === "lg"
                      ? 1.35
                      : 1.05,
                  delay: p.delay,
                  ease: "easeOut",
                }}
                style={{
                  position: "absolute",
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: p.color,
                  boxShadow: `0 0 12px ${p.color}`,
                }}
              />
            ))}
          </>
        ) : null}
      </AnimatePresence>
    </Box>
  );
}
