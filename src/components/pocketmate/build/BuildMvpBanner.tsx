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

export function BuildMvpBanner() {
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
          Build lab (preview)
          <PMBadge tone="warning">Mock backtest engine</PMBadge>
        </AlertTitle>
        <AlertDescription color="pm.muted" fontSize="sm" mt={1}>
          {ctx.executionLabel} · Results are deterministic for a given template
          + name + risk + timeframe. Deploy/export uses a freqtrade-shaped stub
          only—no real bots are started.
        </AlertDescription>
      </Box>
    </Alert>
  );
}
