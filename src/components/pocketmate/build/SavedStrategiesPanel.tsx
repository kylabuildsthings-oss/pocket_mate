"use client";

import { PMCard } from "@/components/pocketmate/PMCard";
import { strategyToFreqtradeStub } from "@/lib/build/freqtradeAdapter";
import type { SavedStrategy } from "@/lib/build/types";
import { useBuildStore } from "@/store/build/useBuildStore";
import {
  Box,
  Button,
  Code,
  Collapse,
  Divider,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export function SavedStrategiesPanel() {
  const saved = useBuildStore((s) => s.saved);
  const deployments = useBuildStore((s) => s.deployments);
  const cloneStrategy = useBuildStore((s) => s.cloneStrategy);
  const deploySimulated = useBuildStore((s) => s.deploySimulated);
  const [exportJson, setExportJson] = useState<string | null>(null);

  const showExport = (strat: SavedStrategy) => {
    setExportJson(JSON.stringify(strategyToFreqtradeStub(strat), null, 2));
  };

  return (
    <PMCard>
      <Heading
        size="sm"
        color="pm.text"
        mb={4}
        fontFamily="var(--font-pm-heading), system-ui"
      >
        Library & simulated ops
      </Heading>
      {saved.length === 0 ? (
        <Text color="pm.muted" fontSize="sm">
          Save a strategy after running a backtest to unlock clone, deploy
          (sim), and freqtrade stub export.
        </Text>
      ) : (
        <VStack align="stretch" spacing={4}>
          {saved.map((s) => (
            <Box
              key={s.id}
              borderWidth="1px"
              borderColor="pm.border"
              borderRadius="lg"
              p={4}
            >
              <Text fontWeight="semibold" color="pm.text">
                {s.name}
              </Text>
              <Text fontSize="xs" color="pm.muted">
                {s.templateId} · {s.timeframe} · {s.risk} · updated{" "}
                {new Date(s.updatedAt).toLocaleString()}
              </Text>
              {s.lastBacktest ? (
                <Text fontSize="sm" color="pm.muted" mt={2}>
                  Last return (sim): {s.lastBacktest.totalReturnPct}% · Sharpe{" "}
                  {s.lastBacktest.sharpe}
                </Text>
              ) : null}
              <Box display="flex" flexWrap="wrap" gap={2} mt={3}>
                <Button
                  size="sm"
                  variant="outline"
                  borderColor="pm.border"
                  color="pm.text"
                  onClick={() => cloneStrategy(s.id)}
                >
                  Clone
                </Button>
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={() => {
                    deploySimulated(s.id);
                  }}
                >
                  Deploy (simulated)
                </Button>
                <Button
                  size="sm"
                  colorScheme="purple"
                  variant="ghost"
                  onClick={() => showExport(s)}
                >
                  Freqtrade stub JSON
                </Button>
              </Box>
            </Box>
          ))}
        </VStack>
      )}

      {deployments.length > 0 ? (
        <>
          <Divider borderColor="pm.border" my={6} />
          <Text fontWeight="semibold" color="pm.text" mb={2}>
            Simulated deployments
          </Text>
          <VStack align="stretch" spacing={2}>
            {deployments.slice(0, 6).map((d) => (
              <Text key={d.id} fontSize="sm" color="pm.muted">
                {d.name} · {new Date(d.at).toLocaleString()} · {d.status}
              </Text>
            ))}
          </VStack>
        </>
      ) : null}

      <Collapse in={Boolean(exportJson)} animateOpacity>
        <Box mt={4}>
          <Text fontSize="xs" color="pm.muted" mb={1}>
            Adapter output (future freqtrade wiring)
          </Text>
          <Code
            display="block"
            whiteSpace="pre"
            p={3}
            borderRadius="md"
            fontSize="xs"
            maxH="200px"
            overflow="auto"
            bg="pm.surfaceHover"
            color="pm.text"
          >
            {exportJson ?? ""}
          </Code>
        </Box>
      </Collapse>
    </PMCard>
  );
}
