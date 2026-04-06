"use client";

import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

// WalletConnect v2 requires a Cloud project id. Use YOUR_PROJECT_ID locally:
// RainbowKit substitutes a public example id (with a console warning).
// Set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in production.
const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
  process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID ||
  "YOUR_PROJECT_ID";

export const { chains, publicClient } = configureChains(
  [goerli, mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "PocketMate",
  projectId,
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
