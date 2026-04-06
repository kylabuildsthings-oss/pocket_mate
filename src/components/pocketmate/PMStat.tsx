"use client";

import { Flex, Text, type FlexProps } from "@chakra-ui/react";
import { PMCard } from "./PMCard";

export type PMStatProps = FlexProps & {
  label: string;
  value: string;
  hint?: string;
};

export function PMStat({ label, value, hint, ...props }: PMStatProps) {
  return (
    <PMCard {...props}>
      <Flex direction="column" gap={1}>
        <Text fontSize="xs" color="pm.muted" textTransform="uppercase" letterSpacing="wider">
          {label}
        </Text>
        <Text
          fontSize="2xl"
          fontWeight="semibold"
          fontFamily="var(--font-pm-heading), system-ui, sans-serif"
          color="pm.text"
        >
          {value}
        </Text>
        {hint ? (
          <Text fontSize="sm" color="pm.muted">
            {hint}
          </Text>
        ) : null}
      </Flex>
    </PMCard>
  );
}
