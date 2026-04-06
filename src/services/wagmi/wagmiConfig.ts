"use client";

import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

// WalletConnect v2 requires a Cloud project id. Use YOUR_PROJECT_ID locally:
// RainbowKit substitutes a public example id (with a console warning).
// Set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in production.
const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
  process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID ||
  "YOUR_PROJECT_ID";

export const { chains, publicClient } = configureChains(
  [goerli],
  [
    // alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY_GOERLI }),
    publicProvider(),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Defikids",
  projectId,
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
