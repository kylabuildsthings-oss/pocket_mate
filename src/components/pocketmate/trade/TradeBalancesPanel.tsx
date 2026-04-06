"use client";

import { PMCard } from "@/components/pocketmate/PMCard";
import { useReferencePrices } from "@/hooks/useReferencePrices";
import { useModeStore } from "@/store/mode/useModeStore";
import { useTradeStore } from "@/store/trade/useTradeStore";
import {
  Box,
  Button,
  Divider,
  Grid,
  NumberInput,
  NumberInputField,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAccount, useBalance } from "wagmi";
import { useState } from "react";

export function TradeBalancesPanel() {
  const mode = useModeStore((s) => s.mode);
  const demo = useTradeStore((s) => s.demo);
  const topUp = useTradeStore((s) => s.topUpDemoUsdc);
  const prices = useReferencePrices();
  const [topUpAmt, setTopUpAmt] = useState(1000);

  const { address, isConnected } = useAccount();
  const { data: nativeBal } = useBalance({
    address,
    watch: true,
    enabled: mode === "live" && Boolean(isConnected && address),
  });

  if (mode === "live") {
    return (
      <PMCard>
        <Text fontWeight="semibold" color="pm.text" mb={3}>
          Live read-only context
        </Text>
        <VStack align="stretch" spacing={2}>
          <Box>
            <Text fontSize="xs" color="pm.muted">
              Reference ETH/USD ({prices.source})
            </Text>
            <Text color="pm.text">
              $
              {prices.ethUsd.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </Text>
          </Box>
          <Box>
            <Text fontSize="xs" color="pm.muted">
              Native balance ({nativeBal?.symbol ?? "—"})
            </Text>
            <Text color="pm.text" fontFamily="mono">
              {nativeBal
                ? nativeBal.formatted
                : isConnected
                ? "…"
                : "Connect wallet (header)"}
            </Text>
          </Box>
          <Text fontSize="xs" color="pm.muted">
            USDC and other ERC-20 readouts will use token contracts in a later
            slice; prices above power simulated quotes in Live.
          </Text>
        </VStack>
      </PMCard>
    );
  }

  return (
    <PMCard>
      <Text fontWeight="semibold" color="pm.text" mb={1}>
        Demo balances
      </Text>
      <Text fontSize="xs" color="pm.muted" mb={3}>
        Paper ETH / USDC for swaps. Reference ETH/USD: $
        {prices.ethUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
        ({prices.source})
      </Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={3}>
        <Box>
          <Text fontSize="xs" color="pm.muted">
            ETH
          </Text>
          <Text fontWeight="bold" color="pm.text">
            {demo.eth.toFixed(4)}
          </Text>
        </Box>
        <Box>
          <Text fontSize="xs" color="pm.muted">
            USDC
          </Text>
          <Text fontWeight="bold" color="pm.text">
            {demo.usdc.toFixed(2)}
          </Text>
        </Box>
        <Box>
          <Text fontSize="xs" color="pm.muted">
            Staked (sim)
          </Text>
          <Text fontWeight="medium" color="pm.text">
            {demo.stakedEth.toFixed(4)} ETH
          </Text>
        </Box>
        <Box>
          <Text fontSize="xs" color="pm.muted">
            LP units (sim)
          </Text>
          <Text fontWeight="medium" color="pm.text">
            {demo.lpUnits.toFixed(4)}
          </Text>
        </Box>
      </Grid>
      <Divider borderColor="pm.border" my={4} />
      <VStack align="stretch" spacing={2}>
        <Text fontSize="sm" color="pm.muted">
          Top up paper USDC
        </Text>
        <NumberInput
          min={0}
          value={topUpAmt}
          onChange={(_, v) => setTopUpAmt(Number.isFinite(v) ? v : 0)}
          size="sm"
        >
          <NumberInputField
            bg="pm.surface"
            borderColor="pm.border"
            color="pm.text"
          />
        </NumberInput>
        <Button size="sm" colorScheme="purple" onClick={() => topUp(topUpAmt)}>
          Add {topUpAmt} USDC (paper)
        </Button>
      </VStack>
    </PMCard>
  );
}
