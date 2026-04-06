"use client";

import { PMCard } from "@/components/pocketmate/PMCard";
import type { StrategyTemplate } from "@/lib/build/types";
import { Box, Grid, Text, VStack } from "@chakra-ui/react";

type Props = {
  templates: StrategyTemplate[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function TemplatePicker({ templates, selectedId, onSelect }: Props) {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={3}
    >
      {templates.map((t) => {
        const active = t.id === selectedId;
        return (
          <PMCard
            key={t.id}
            cursor="pointer"
            onClick={() => onSelect(t.id)}
            borderColor={active ? "pm.primarySoft" : "pm.border"}
            bg={active ? "pm.surfaceHover" : "pm.surface"}
            transition="all 0.15s ease"
          >
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold" color="pm.text">
                {t.name}
              </Text>
              <Text fontSize="xs" color="pm.muted" fontFamily="mono">
                {t.assetHint}
              </Text>
              <Text fontSize="sm" color="pm.muted" lineHeight="short">
                {t.description}
              </Text>
            </VStack>
          </PMCard>
        );
      })}
    </Grid>
  );
}
