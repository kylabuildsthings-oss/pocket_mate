"use client";

import { quoteSwap } from "@/lib/trade/simEngine";
import { useReferencePrices } from "@/hooks/useReferencePrices";
import { useModeStore } from "@/store/mode/useModeStore";
import { useTradeStore } from "@/store/trade/useTradeStore";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  NumberInput,
  NumberInputField,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { PMTabs } from "../PMTabs";

type Props = {
  onSimulatedComplete: () => void;
  isBusy: boolean;
};

export function TradeSurfacesTabs({ onSimulatedComplete, isBusy }: Props) {
  const toast = useToast();
  const mode = useModeStore((s) => s.mode);
  const prices = useReferencePrices();
  const runSwap = useTradeStore((s) => s.runSwap);
  const runStake = useTradeStore((s) => s.runStake);
  const runLiq = useTradeStore((s) => s.runLiquidity);

  const ethUsd = prices.ethUsd;

  const [swapIn, setSwapIn] = useState(0.1);
  const [swapToken, setSwapToken] = useState<"ETH" | "USDC">("ETH");
  const [stakeAmt, setStakeAmt] = useState(0.25);
  const [liqEth, setLiqEth] = useState(0.2);
  const [liqUsdc, setLiqUsdc] = useState(roundN(0.2 * ethUsd, 2));

  const swapPreview = quoteSwap(swapIn, swapToken, ethUsd);

  const applySuggestedUsdc = () => {
    setLiqUsdc(roundN(liqEth * ethUsd, 2));
  };

  const wrap = (fn: () => unknown) => {
    if (isBusy) return;
    const r = fn();
    if (r) {
      onSimulatedComplete();
    } else {
      toast({
        title: "Could not simulate",
        description:
          "Check amounts and demo balances (Demo) or try a smaller size.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <PMTabs>
      <TabList flexWrap="wrap" gap={1}>
        <Tab>Swap</Tab>
        <Tab>Stake</Tab>
        <Tab>Liquidity</Tab>
      </TabList>
      <TabPanels>
        <TabPanel px={0} pt={4}>
          <VStack align="stretch" spacing={4}>
            <Text fontSize="sm" color="pm.muted">
              Deterministic quote from reference ETH/USD. Demo debits paper
              balances; Live logs a read-context receipt without moving funds.
            </Text>
            <Grid
              templateColumns={{ base: "1fr", md: "1fr 120px 1fr" }}
              gap={3}
            >
              <FormControl>
                <FormLabel color="pm.muted" fontSize="sm">
                  Amount in
                </FormLabel>
                <NumberInput
                  min={0}
                  step={0.01}
                  value={swapIn}
                  onChange={(_, v) => setSwapIn(Number.isFinite(v) ? v : 0)}
                  isDisabled={isBusy}
                >
                  <NumberInputField
                    bg="pm.surface"
                    borderColor="pm.border"
                    color="pm.text"
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel color="pm.muted" fontSize="sm">
                  Token in
                </FormLabel>
                <Select
                  value={swapToken}
                  onChange={(e) =>
                    setSwapToken(e.target.value as "ETH" | "USDC")
                  }
                  bg="pm.surface"
                  borderColor="pm.border"
                  color="pm.text"
                  isDisabled={isBusy}
                >
                  <option value="ETH">ETH</option>
                  <option value="USDC">USDC</option>
                </Select>
              </FormControl>
              <Box>
                <Text fontSize="xs" color="pm.muted" mb={1}>
                  Quote (preview)
                </Text>
                <Text color="pm.text" fontWeight="medium">
                  ≈ {swapPreview.amountOut} {swapPreview.tokenOut}
                </Text>
              </Box>
            </Grid>
            <Button
              colorScheme="purple"
              isDisabled={isBusy || swapIn <= 0}
              onClick={() =>
                wrap(() => runSwap(mode, swapIn, swapToken, ethUsd))
              }
            >
              Run simulated swap
            </Button>
          </VStack>
        </TabPanel>
        <TabPanel px={0} pt={4}>
          <VStack align="stretch" spacing={4}>
            <Text fontSize="sm" color="pm.muted">
              Practice staking: demo debits ETH and credits a fictional pmETH
              receipt factor. Live records the same flow without touching your
              wallet balance.
            </Text>
            <FormControl>
              <FormLabel color="pm.muted" fontSize="sm">
                ETH amount
              </FormLabel>
              <NumberInput
                min={0}
                step={0.05}
                value={stakeAmt}
                onChange={(_, v) => setStakeAmt(Number.isFinite(v) ? v : 0)}
                isDisabled={isBusy}
              >
                <NumberInputField
                  bg="pm.surface"
                  borderColor="pm.border"
                  color="pm.text"
                />
              </NumberInput>
            </FormControl>
            <Button
              colorScheme="green"
              isDisabled={isBusy || stakeAmt <= 0}
              onClick={() => wrap(() => runStake(mode, stakeAmt))}
            >
              Run simulated stake
            </Button>
          </VStack>
        </TabPanel>
        <TabPanel px={0} pt={4}>
          <VStack align="stretch" spacing={4}>
            <Text fontSize="sm" color="pm.muted">
              Add two-sided liquidity at your chosen ratio. “Match reference
              price” pre-fills USDC from ETH using the live reference rate.
            </Text>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={3}>
              <FormControl>
                <FormLabel color="pm.muted" fontSize="sm">
                  ETH
                </FormLabel>
                <NumberInput
                  min={0}
                  step={0.01}
                  value={liqEth}
                  onChange={(_, v) => setLiqEth(Number.isFinite(v) ? v : 0)}
                  isDisabled={isBusy}
                >
                  <NumberInputField
                    bg="pm.surface"
                    borderColor="pm.border"
                    color="pm.text"
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel color="pm.muted" fontSize="sm">
                  USDC
                </FormLabel>
                <NumberInput
                  min={0}
                  step={1}
                  value={liqUsdc}
                  onChange={(_, v) => setLiqUsdc(Number.isFinite(v) ? v : 0)}
                  isDisabled={isBusy}
                >
                  <NumberInputField
                    bg="pm.surface"
                    borderColor="pm.border"
                    color="pm.text"
                  />
                </NumberInput>
              </FormControl>
            </Grid>
            <Button
              size="sm"
              variant="outline"
              borderColor="pm.border"
              color="pm.text"
              onClick={applySuggestedUsdc}
            >
              Match reference price (USDC ≈ ETH × ${ethUsd.toFixed(2)})
            </Button>
            <Button
              colorScheme="purple"
              isDisabled={isBusy || liqEth <= 0 || liqUsdc <= 0}
              onClick={() => wrap(() => runLiq(mode, liqEth, liqUsdc))}
            >
              Run simulated add-liquidity
            </Button>
          </VStack>
        </TabPanel>
      </TabPanels>
    </PMTabs>
  );
}

function roundN(n: number, d: number) {
  const p = 10 ** d;
  return Math.round(n * p) / p;
}
