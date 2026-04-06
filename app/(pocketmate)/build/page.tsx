"use client";

import { BuildMvpBanner } from "@/components/pocketmate/build/BuildMvpBanner";
import { BacktestMetrics } from "@/components/pocketmate/build/BacktestMetrics";
import { SavedStrategiesPanel } from "@/components/pocketmate/build/SavedStrategiesPanel";
import { TemplatePicker } from "@/components/pocketmate/build/TemplatePicker";
import { PMCard } from "@/components/pocketmate/PMCard";
import { STRATEGY_TEMPLATES } from "@/data/build/strategyTemplates";
import type { BacktestRequest, BacktestResult } from "@/lib/build/types";
import { useGamificationStore } from "@/store/gamification/useGamificationStore";
import { useBuildStore } from "@/store/build/useBuildStore";
import { useModeStore } from "@/store/mode/useModeStore";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";

export default function BuildPage() {
  const toast = useToast();
  const setActionLock = useModeStore((s) => s.setActionLock);
  const recordMockBacktest = useGamificationStore((s) => s.recordMockBacktest);
  const saveStrategy = useBuildStore((s) => s.saveStrategy);
  const pushRunLog = useBuildStore((s) => s.pushRunLog);
  const resetBuild = useBuildStore((s) => s.resetBuild);

  const [templateId, setTemplateId] = useState(STRATEGY_TEMPLATES[0]?.id ?? "");
  const [name, setName] = useState("My PocketMate strategy");
  const [notes, setNotes] = useState("");
  const [risk, setRisk] = useState<BacktestRequest["risk"]>("med");
  const [timeframe, setTimeframe] = useState("1h");
  const [libraryId, setLibraryId] = useState<string | null>(null);
  const [result, setResult] = useState<BacktestResult | null>(null);
  const [loading, setLoading] = useState(false);

  const runBacktest = useCallback(async () => {
    setLoading(true);
    setActionLock(true);
    try {
      const body: BacktestRequest = {
        templateId,
        strategyName: name.trim() || "Untitled strategy",
        risk,
        timeframe,
      };
      const res = await fetch("/api/pocketmate/backtest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          (data as { error?: string }).error || "Backtest failed"
        );
      }
      const next = data as BacktestResult;
      setResult(next);
      pushRunLog(next);
      recordMockBacktest();
      toast({
        title: "Mock backtest complete",
        status: "success",
        duration: 2600,
      });
    } catch (e) {
      toast({
        title: "Backtest error",
        description: e instanceof Error ? e.message : "Unknown error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      setActionLock(false);
    }
  }, [
    templateId,
    name,
    risk,
    timeframe,
    pushRunLog,
    recordMockBacktest,
    setActionLock,
    toast,
  ]);

  const handleSave = () => {
    const s = saveStrategy({
      id: libraryId ?? undefined,
      name: name.trim() || "Untitled strategy",
      templateId,
      notes,
      risk,
      timeframe,
      lastBacktest: result ?? undefined,
    });
    setLibraryId(s.id);
    toast({
      title: "Strategy saved locally",
      status: "success",
      duration: 2200,
    });
  };

  const handleNew = () => {
    setLibraryId(null);
    setName("My PocketMate strategy");
    setNotes("");
    setResult(null);
    setRisk("med");
    setTimeframe("1h");
    setTemplateId(STRATEGY_TEMPLATES[0]?.id ?? "");
  };

  return (
    <VStack align="stretch" spacing={8}>
      <VStack align="start" spacing={2}>
        <Heading
          size="lg"
          fontFamily="var(--font-pm-heading), system-ui, sans-serif"
          color="pm.text"
        >
          Build
        </Heading>
        <Text color="pm.muted" maxW="3xl">
          Pick a template, tune risk and timeframe, run a deterministic mock
          backtest via API, then save, clone, or simulate deploy. Export shows a
          freqtrade-shaped stub for future wiring.
        </Text>
      </VStack>

      <BuildMvpBanner />

      <PMCard>
        <Heading
          size="sm"
          color="pm.text"
          mb={4}
          fontFamily="var(--font-pm-heading), system-ui"
        >
          Templates
        </Heading>
        <TemplatePicker
          templates={STRATEGY_TEMPLATES}
          selectedId={templateId}
          onSelect={setTemplateId}
        />
      </PMCard>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} alignItems="start">
        <PMCard>
          <Heading
            size="sm"
            color="pm.text"
            mb={4}
            fontFamily="var(--font-pm-heading), system-ui"
          >
            Strategy editor
          </Heading>
          <VStack align="stretch" spacing={4}>
            <FormControl>
              <FormLabel color="pm.muted" fontSize="sm">
                Name
              </FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                bg="pm.surface"
                borderColor="pm.border"
                color="pm.text"
              />
            </FormControl>
            <FormControl>
              <FormLabel color="pm.muted" fontSize="sm">
                Notes (local only)
              </FormLabel>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                bg="pm.surface"
                borderColor="pm.border"
                color="pm.text"
              />
            </FormControl>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl>
                <FormLabel color="pm.muted" fontSize="sm">
                  Risk preset
                </FormLabel>
                <Select
                  value={risk}
                  onChange={(e) =>
                    setRisk(e.target.value as BacktestRequest["risk"])
                  }
                  bg="pm.surface"
                  borderColor="pm.border"
                  color="pm.text"
                >
                  <option value="low">Low</option>
                  <option value="med">Medium</option>
                  <option value="high">High</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel color="pm.muted" fontSize="sm">
                  Timeframe label
                </FormLabel>
                <Select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  bg="pm.surface"
                  borderColor="pm.border"
                  color="pm.text"
                >
                  <option value="15m">15m</option>
                  <option value="1h">1h</option>
                  <option value="4h">4h</option>
                  <option value="1d">1d</option>
                </Select>
              </FormControl>
            </SimpleGrid>
            <Box display="flex" flexWrap="wrap" gap={3}>
              <Button
                colorScheme="purple"
                onClick={() => void runBacktest()}
                isLoading={loading}
                isDisabled={!templateId}
              >
                Run mock backtest
              </Button>
              <Button
                variant="outline"
                borderColor="pm.border"
                color="pm.text"
                onClick={handleSave}
              >
                Save to library
              </Button>
              <Button variant="ghost" color="pm.muted" onClick={handleNew}>
                New strategy
              </Button>
            </Box>
            {libraryId ? (
              <Text fontSize="xs" color="pm.muted">
                Editing library id{" "}
                <Box as="span" fontFamily="mono">
                  {libraryId}
                </Box>
              </Text>
            ) : null}
          </VStack>
        </PMCard>

        <PMCard>
          <Heading
            size="sm"
            color="pm.text"
            mb={4}
            fontFamily="var(--font-pm-heading), system-ui"
          >
            Last backtest
          </Heading>
          {result ? (
            <BacktestMetrics result={result} />
          ) : (
            <Text color="pm.muted" fontSize="sm">
              Run a backtest to populate win rate, Sharpe, return, drawdown, and
              the mock equity sparkline.
            </Text>
          )}
        </PMCard>
      </SimpleGrid>

      <SavedStrategiesPanel />

      <Box>
        <Button
          size="xs"
          variant="ghost"
          color="pm.muted"
          onClick={() => resetBuild()}
        >
          Reset local build library & deployment log
        </Button>
      </Box>
    </VStack>
  );
}
