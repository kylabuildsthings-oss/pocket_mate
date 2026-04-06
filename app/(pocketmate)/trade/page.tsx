"use client";

import { PMCard } from "@/components/pocketmate/PMCard";
import { PocketMateStubPage } from "@/components/pocketmate/PocketMateStubPage";
import { TradeBalancesPanel } from "@/components/pocketmate/trade/TradeBalancesPanel";
import { TradeExecutionBanner } from "@/components/pocketmate/trade/TradeExecutionBanner";
import { TradeHistoryTable } from "@/components/pocketmate/trade/TradeHistoryTable";
import { useGamificationStore } from "@/store/gamification/useGamificationStore";
import { useModeStore } from "@/store/mode/useModeStore";
import { useTradeStore } from "@/store/trade/useTradeStore";
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

const TradeSurfacesTabs = dynamic(
  () =>
    import("@/components/pocketmate/trade/TradeSurfacesTabs").then(
      (m) => m.TradeSurfacesTabs
    ),
  {
    ssr: false,
    loading: () => (
      <Flex py={8} justify="center" aria-busy="true">
        <Spinner color="pm.primarySoft" aria-label="Loading trade surfaces" />
      </Flex>
    ),
  }
);

export default function TradePage() {
  const toast = useToast();
  const setActionLock = useModeStore((s) => s.setActionLock);
  const recordSimulatedTrade = useGamificationStore(
    (s) => s.recordSimulatedTrade
  );
  const resetTrade = useTradeStore((s) => s.resetTrade);

  const [surfaceBusy, setSurfaceBusy] = useState(false);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onSimulatedComplete = useCallback(() => {
    recordSimulatedTrade();
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    setActionLock(true);
    setSurfaceBusy(true);
    lockTimerRef.current = setTimeout(() => {
      setActionLock(false);
      setSurfaceBusy(false);
      lockTimerRef.current = null;
    }, 2200);
  }, [recordSimulatedTrade, setActionLock]);

  useEffect(() => {
    return () => {
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
      setActionLock(false);
    };
  }, [setActionLock]);

  return (
    <VStack align="stretch" spacing={8}>
      <PocketMateStubPage
        title="Trade"
        description="Hybrid trade lab: Demo paper balances and full simulated swap / stake / liquidity flows. Live pulls read-only wallet + reference prices while execution stays clearly labeled as simulated for this MVP."
      />

      <TradeExecutionBanner />

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} alignItems="start">
        <TradeBalancesPanel />
        <PMCard>
          <Heading
            size="sm"
            color="pm.text"
            mb={4}
            fontFamily="var(--font-pm-heading), system-ui"
          >
            Surfaces
          </Heading>
          <TradeSurfacesTabs
            onSimulatedComplete={onSimulatedComplete}
            isBusy={surfaceBusy}
          />
          <Text fontSize="xs" color="pm.muted" mt={4}>
            Actions award the existing campus XP hook (+15 activity) once per
            completed simulated flow while the mode switch is briefly locked
            (Phase 4 guardrail).
          </Text>
        </PMCard>
      </SimpleGrid>

      <PMCard>
        <TradeHistoryTable />
      </PMCard>

      <Box>
        <Button
          size="xs"
          variant="ghost"
          color="pm.muted"
          onClick={() => {
            resetTrade();
            toast({
              title: "Trade sandbox reset",
              status: "info",
              duration: 2500,
            });
          }}
        >
          Reset local trade history & demo balances
        </Button>
      </Box>
    </VStack>
  );
}
