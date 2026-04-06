"use client";

import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { PMBadge } from "./PMBadge";
import { useModeStore } from "@/store/mode/useModeStore";

export function ModeToggle() {
  const { mode, isActionLocked, requestMode, confirmAndSwitchToLive } =
    useModeStore((state) => ({
      mode: state.mode,
      isActionLocked: state.isActionLocked,
      requestMode: state.requestMode,
      confirmAndSwitchToLive: state.confirmAndSwitchToLive,
    }));

  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const switchMode = (nextMode: "demo" | "live") => {
    const result = requestMode(nextMode);
    if (result.requiresConfirmation) {
      onOpen();
    }
  };

  const modeBadge =
    mode === "live" ? (
      isConnected ? (
        <PMBadge tone="success">Live · wallet linked</PMBadge>
      ) : (
        <PMBadge tone="warning">Live · connect wallet</PMBadge>
      )
    ) : (
      <PMBadge tone="primary">Demo Active</PMBadge>
    );

  return (
    <>
      <Flex align="center" gap={3}>
        {modeBadge}
        <Box
          borderWidth="1px"
          borderColor="pm.border"
          borderRadius="lg"
          bg="pm.surface"
          p={1}
        >
          <Flex gap={1}>
            <Button
              size="sm"
              data-testid="mode-toggle-demo"
              onClick={() => switchMode("demo")}
              isDisabled={isActionLocked}
              bg={mode === "demo" ? "pm.primarySoft" : "transparent"}
              color={mode === "demo" ? "white" : "pm.muted"}
              _hover={{
                bg: mode === "demo" ? "pm.primarySoft" : "pm.surfaceHover",
              }}
            >
              Demo
            </Button>
            <Button
              size="sm"
              data-testid="mode-toggle-live"
              onClick={() => switchMode("live")}
              isDisabled={isActionLocked}
              bg={mode === "live" ? "green.500" : "transparent"}
              color={mode === "live" ? "white" : "pm.muted"}
              _hover={{ bg: mode === "live" ? "green.500" : "pm.surfaceHover" }}
            >
              Live
            </Button>
          </Flex>
        </Box>
      </Flex>
      {isActionLocked ? (
        <Text fontSize="xs" color="pm.warning">
          Mode switch locked while an action is in progress.
        </Text>
      ) : null}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent
          data-testid="live-risk-modal"
          bg="pm.surface"
          borderWidth="1px"
          borderColor="pm.border"
        >
          <ModalHeader color="pm.text">Switch to Live Mode?</ModalHeader>
          <ModalCloseButton />
          <ModalBody color="pm.muted">
            You are about to use real wallet funds and real network fees apply.
            Only invest what you can afford to lose.
          </ModalBody>
          <ModalFooter gap={3}>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              data-testid="live-risk-confirm"
              colorScheme="green"
              onClick={() => {
                confirmAndSwitchToLive();
                console.info(
                  "[pm-audit]",
                  JSON.stringify({
                    event: "live_mode_confirmed",
                    ts: Date.now(),
                  })
                );
                onClose();
                window.setTimeout(() => {
                  if (!isConnected) openConnectModal?.();
                }, 0);
              }}
            >
              I understand, go Live
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
