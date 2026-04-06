"use client";

import type { BacktestResult } from "@/lib/build/types";
import { PMStat } from "@/components/pocketmate/PMStat";
import { SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { EquitySparkline } from "./EquitySparkline";

export function BacktestMetrics({ result }: { result: BacktestResult }) {
  return (
    <VStack align="stretch" spacing={4}>
      <Text fontSize="sm" color="pm.muted">
        {result.strategyName} · {result.templateId} · {result.timeframe} · risk{" "}
        {result.risk} · {result.trades} trades (sim)
      </Text>
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3}>
        <PMStat
          label="Win rate"
          value={`${result.winRatePct}%`}
          hint="Mock classifier"
        />
        <PMStat
          label="Sharpe (ann.)"
          value={String(result.sharpe)}
          hint="Deterministic"
        />
        <PMStat
          label="Return"
          value={`${result.totalReturnPct}%`}
          hint="Total (sim)"
        />
        <PMStat
          label="Max DD"
          value={`${result.maxDrawdownPct}%`}
          hint="Peak to trough"
        />
      </SimpleGrid>
      <EquitySparkline series={result.equityCurve} />
      <Text fontSize="xs" color="pm.muted" fontFamily="mono">
        Engine: {result.engine} · {new Date(result.computedAt).toISOString()}
      </Text>
    </VStack>
  );
}
