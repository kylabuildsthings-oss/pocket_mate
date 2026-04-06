"use client";

import { Box, Flex, Text } from "@chakra-ui/react";

export function EquitySparkline({ series }: { series: number[] }) {
  if (!series.length) return null;
  return (
    <Box>
      <Text fontSize="xs" color="pm.muted" mb={2}>
        Mock equity curve (normalized)
      </Text>
      <Flex
        align="flex-end"
        gap="2px"
        h="72px"
        borderBottomWidth="1px"
        borderColor="pm.border"
        pb={1}
      >
        {series.map((v, i) => (
          <Box
            // eslint-disable-next-line react/no-array-index-key -- stable order for visual only
            key={i}
            flex="1"
            minW="3px"
            borderRadius="sm"
            bg="pm.primarySoft"
            opacity={0.35 + v * 0.65}
            h={`${Math.max(8, v * 100)}%`}
          />
        ))}
      </Flex>
    </Box>
  );
}
