"use client";

import { PMCard } from "@/components/pocketmate/PMCard";
import {
  Badge,
  Box,
  Button,
  Heading,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";

export function PocketMateCloudAccount() {
  const toast = useToast();
  const { data: session, status } = useSession();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync, isLoading: signing } = useSignMessage();
  const [dbEnabled, setDbEnabled] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/pocketmate/db-ready")
      .then((r) => r.json())
      .then((j: { enabled?: boolean }) => {
        if (!cancelled) setDbEnabled(Boolean(j?.enabled));
      })
      .catch(() => {
        if (!cancelled) setDbEnabled(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const onWalletSignIn = useCallback(async () => {
    if (!address) {
      toast({
        title: "Connect a wallet first",
        status: "warning",
        duration: 2500,
      });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(
        `/api/pocketmate/auth/challenge?address=${encodeURIComponent(address)}`
      );
      const j = (await res.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
      };
      if (!res.ok) {
        throw new Error(j.error || "Could not request sign-in message");
      }
      if (!j.message) throw new Error("Invalid challenge response");
      const signature = await signMessageAsync({ message: j.message });
      const out = await signIn("ethereum-wallet", {
        address,
        message: j.message,
        signature,
        redirect: false,
      });
      if (out?.error) {
        throw new Error(out.error);
      }
      toast({
        title: "Signed in",
        description: "Cloud profile session active on this device.",
        status: "success",
        duration: 3000,
      });
    } catch (e) {
      toast({
        title: "Sign-in failed",
        description: e instanceof Error ? e.message : "Error",
        status: "error",
        duration: 4500,
      });
    } finally {
      setBusy(false);
    }
  }, [address, signMessageAsync, toast]);

  return (
    <PMCard>
      <VStack align="stretch" spacing={4}>
        <Box>
          <Heading
            size="sm"
            fontFamily="var(--font-pm-heading), system-ui, sans-serif"
            color="pm.text"
            mb={1}
          >
            Cloud account (beta)
          </Heading>
          <Text fontSize="sm" color="pm.muted">
            Optionally sign in with your live wallet to attach progress to a
            Postgres-backed profile when <code>DATABASE_URL</code> is
            configured. Demo mode and local stores keep working without this.
          </Text>
        </Box>

        {dbEnabled === false ? (
          <Text fontSize="sm" color="orange.300">
            Set <code>DATABASE_URL</code> and <code>NEXTAUTH_SECRET</code> in{" "}
            <code>.env</code>, run migrations, then restart the dev server.
          </Text>
        ) : null}

        {status === "authenticated" && session?.user ? (
          <VStack align="stretch" spacing={3}>
            <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
              <Text fontSize="sm" color="pm.text">
                Signed in as{" "}
                <strong>{session.user.name || session.user.id}</strong>
              </Text>
              <Badge colorScheme="purple">{session.user.role}</Badge>
            </Box>
            <Button
              size="sm"
              variant="outline"
              alignSelf="flex-start"
              onClick={() => void signOut({ redirect: false })}
            >
              Sign out of cloud session
            </Button>
          </VStack>
        ) : (
          <VStack align="stretch" spacing={2}>
            <Text fontSize="xs" color="pm.muted">
              Live wallet:{" "}
              {isConnected && address
                ? `${address.slice(0, 6)}…${address.slice(-4)}`
                : "not connected"}
            </Text>
            <Button
              colorScheme="purple"
              size="sm"
              w="fit-content"
              isLoading={busy || signing || status === "loading"}
              isDisabled={dbEnabled === false || !isConnected || !address}
              onClick={() => void onWalletSignIn()}
            >
              Sign message to link wallet
            </Button>
            {isConnected ? (
              <Button
                size="xs"
                variant="ghost"
                w="fit-content"
                onClick={() => disconnect()}
              >
                Disconnect wallet
              </Button>
            ) : null}
          </VStack>
        )}
      </VStack>
    </PMCard>
  );
}
