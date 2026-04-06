"use client";

import { getModeAwareContext } from "@/lib/modeAware";
import { useModeStore } from "@/store/mode/useModeStore";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react";
import { PMBadge } from "../PMBadge";

export function TradeExecutionBanner() {
  const mode = useModeStore((s) => s.mode);
  const ctx = getModeAwareContext(mode);

  return (
    <Alert
      status="info"
      borderRadius="lg"
      bg="pm.surface"
      borderWidth="1px"
      borderColor="pm.border"
    >
      <AlertIcon color="pm.primarySoft" />
      <Box flex="1">
        <AlertTitle
          color="pm.text"
          display="flex"
          alignItems="center"
          gap={2}
          flexWrap="wrap"
        >
          {ctx.executionLabel}
          <PMBadge tone="warning">Simulated execution (MVP)</PMBadge>
        </AlertTitle>
        <AlertDescription color="pm.muted" fontSize="sm" mt={1}>
          {ctx.fundsLabel} · {ctx.riskLabel}. Receipts below are practice
          logs—no on-chain swap, stake, or pool calls are sent from PocketMate
          in this build.
        </AlertDescription>
      </Box>
    </Alert>
  );
}
