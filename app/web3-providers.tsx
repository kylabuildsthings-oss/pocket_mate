"use client";

import { chains, wagmiConfig } from "@/services/wagmi/wagmiConfig";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { useEffect, useState } from "react";

const loadingShell = (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0b0e14",
      color: "#e2e8f0",
      fontFamily: "system-ui, sans-serif",
    }}
  >
    Loading PocketMate…
  </div>
);

/**
 * Isolated client bundle for wagmi + WalletConnect + RainbowKit async chunks.
 * Loaded via `next/dynamic({ ssr: false })` from `providers.tsx` to avoid dev HMR chunk mismatches.
 */
export default function Web3Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        {mounted ? children : loadingShell}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
