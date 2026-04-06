"use client";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { UserRejectedRequestError } from "viem";
import { useEffect, useRef, useState } from "react";
import { useAccount, useBalance, useConnect, useNetwork } from "wagmi";
import { useDemoWallet } from "@/hooks/useDemoWallet";
import { useModeStore } from "@/store/mode/useModeStore";

function truncateAddress(a: string) {
  if (!a || a.length < 12) return a;
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}

function isUserRejectedConnect(e: unknown): boolean {
  if (e instanceof UserRejectedRequestError) return true;
  return Boolean(
    e &&
      typeof e === "object" &&
      "name" in e &&
      (e as { name: string }).name === "UserRejectedRequestError"
  );
}

export function PocketMateWalletStrip() {
  const mode = useModeStore((s) => s.mode);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { error: connectError } = useConnect();
  const { address: demoAddress, ready: demoReady } = useDemoWallet();

  const [rejectVisible, setRejectVisible] = useState(false);
  const [disconnectVisible, setDisconnectVisible] = useState(false);
  const wasConnectedRef = useRef(false);

  useEffect(() => {
    if (connectError && isUserRejectedConnect(connectError)) {
      setRejectVisible(true);
      const t = window.setTimeout(() => setRejectVisible(false), 10000);
      return () => window.clearTimeout(t);
    }
    setRejectVisible(false);
    return undefined;
  }, [connectError]);

  useEffect(() => {
    if (isConnected) {
      setDisconnectVisible(false);
    }
  }, [isConnected]);

  useEffect(() => {
    if (mode !== "live") {
      wasConnectedRef.current = isConnected;
      setDisconnectVisible(false);
      return;
    }
    if (wasConnectedRef.current && !isConnected) {
      setDisconnectVisible(true);
      console.info(
        "[pm-audit]",
        JSON.stringify({ event: "wallet_disconnected", ts: Date.now() })
      );
      const t = window.setTimeout(() => setDisconnectVisible(false), 12000);
      wasConnectedRef.current = false;
      return () => window.clearTimeout(t);
    }
    wasConnectedRef.current = isConnected;
    return undefined;
  }, [mode, isConnected]);

  const liveNeedsWallet = mode === "live" && !isConnected;
  const wrongNetwork =
    mode === "live" && isConnected && Boolean(chain && chain.unsupported);

  const { data: balance } = useBalance({
    address,
    enabled:
      mode === "live" && Boolean(isConnected && address && !wrongNetwork),
    watch: true,
  });

  const didAuditConnect = useRef(false);
  useEffect(() => {
    if (!isConnected || !address || mode !== "live") {
      didAuditConnect.current = false;
      return;
    }
    if (didAuditConnect.current) return;
    didAuditConnect.current = true;
    console.info(
      "[pm-audit]",
      JSON.stringify({
        event: "wallet_connected",
        ts: Date.now(),
        chainId: chain?.id ?? null,
        addressPrefix: address.slice(0, 10),
      })
    );
  }, [isConnected, address, mode, chain?.id]);

  const readoutRow =
    mode === "live" && isConnected && !wrongNetwork && address ? (
      <Flex
        flexWrap="wrap"
        align="center"
        gap={{ base: 2, md: 4 }}
        px={4}
        py={3}
        borderRadius="md"
        borderWidth="1px"
        borderColor="pm.border"
        bg="pm.surface"
      >
        <Text fontSize="sm" color="pm.muted">
          Network
        </Text>
        <Text fontSize="sm" color="pm.text" fontWeight="medium">
          {chain?.name ?? "—"}
        </Text>
        <Text fontSize="sm" color="pm.muted">
          Account
        </Text>
        <Text fontSize="sm" color="pm.text" fontFamily="mono">
          {truncateAddress(address)}
        </Text>
        <Text fontSize="sm" color="pm.muted">
          Native (read-only)
        </Text>
        <Text fontSize="sm" color="pm.text" fontWeight="medium">
          {balance ? `${balance.formatted} ${balance.symbol}` : "…"}
        </Text>
      </Flex>
    ) : null;

  const demoRow =
    mode === "demo" && demoReady ? (
      <Flex
        flexWrap="wrap"
        align="center"
        gap={{ base: 2, md: 4 }}
        px={4}
        py={3}
        borderRadius="md"
        borderWidth="1px"
        borderColor="pm.border"
        bg="pm.surface"
      >
        <Text fontSize="sm" color="pm.muted">
          Demo identity
        </Text>
        <Text fontSize="sm" color="pm.text" fontFamily="mono">
          {truncateAddress(demoAddress)}
        </Text>
        <Text fontSize="sm" color="pm.muted">
          Simulated balance
        </Text>
        <Text fontSize="sm" color="pm.text" fontWeight="medium">
          £1,000 paper
        </Text>
        <Text fontSize="xs" color="pm.muted">
          No keys stored · display only
        </Text>
      </Flex>
    ) : null;

  return (
    <Box px={{ base: 4, md: 8 }} pt={4} pb={0}>
      <Collapse in={rejectVisible} animateOpacity>
        <Alert status="warning" borderRadius="md" mb={3}>
          <AlertIcon />
          <Box>
            <AlertTitle fontSize="sm">Wallet request cancelled</AlertTitle>
            <AlertDescription fontSize="sm">
              The connection or signature was rejected in your wallet. Try again
              when you are ready.
            </AlertDescription>
          </Box>
        </Alert>
      </Collapse>

      <Collapse in={disconnectVisible} animateOpacity>
        <Alert status="info" borderRadius="md" mb={3}>
          <AlertIcon />
          <Box>
            <AlertTitle fontSize="sm">Wallet disconnected</AlertTitle>
            <AlertDescription fontSize="sm">
              Live mode stays on, but chain data pauses until you connect again.
              Use Connect in the header or your wallet extension.
            </AlertDescription>
          </Box>
        </Alert>
      </Collapse>

      {liveNeedsWallet ? (
        <Alert status="warning" borderRadius="md" mb={3}>
          <AlertIcon />
          <Flex
            flex="1"
            direction={{ base: "column", sm: "row" }}
            align={{ sm: "center" }}
            gap={3}
          >
            <Box flex="1">
              <AlertTitle fontSize="sm">Live mode needs a wallet</AlertTitle>
              <AlertDescription fontSize="sm">
                Connect a wallet to view real chain context and balances.
                Execution in this MVP stays simulated unless a flow explicitly
                sends a transaction.
              </AlertDescription>
            </Box>
            {openConnectModal ? (
              <Button
                size="sm"
                colorScheme="green"
                onClick={() => openConnectModal()}
              >
                Connect wallet
              </Button>
            ) : null}
          </Flex>
        </Alert>
      ) : null}

      {wrongNetwork ? (
        <Alert status="error" borderRadius="md" mb={3}>
          <AlertIcon />
          <Flex
            flex="1"
            direction={{ base: "column", sm: "row" }}
            align={{ sm: "center" }}
            gap={3}
          >
            <Box flex="1">
              <AlertTitle fontSize="sm">Unsupported network</AlertTitle>
              <AlertDescription fontSize="sm">
                Switch to Goerli or Ethereum mainnet (read-only) to use
                PocketMate in Live mode.
              </AlertDescription>
            </Box>
            {openChainModal ? (
              <Button size="sm" onClick={() => openChainModal()}>
                Switch network
              </Button>
            ) : null}
          </Flex>
        </Alert>
      ) : null}

      {mode === "live" && isConnected && !wrongNetwork ? (
        <Text fontSize="xs" color="pm.muted" mb={2}>
          Wallet linked · balances are read-only in the UI; always verify in
          your wallet before signing.
        </Text>
      ) : null}

      {readoutRow}
      {demoRow}
    </Box>
  );
}
