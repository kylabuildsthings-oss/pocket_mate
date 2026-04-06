"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/services/chakra/theme";
import { ColorModeScript } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";
import "@fontsource/slackey";
import "@fontsource-variable/jetbrains-mono";

const Web3Providers = dynamic(() => import("./web3-providers"), {
  ssr: false,
  loading: () => (
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
  ),
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CacheProvider>
        <ChakraProvider
          theme={theme}
          toastOptions={{
            defaultOptions: {
              position: "bottom",
              isClosable: true,
              duration: 4000,
            },
          }}
        >
          <SessionProvider refetchOnWindowFocus={false}>
            <Web3Providers>{children}</Web3Providers>
          </SessionProvider>
        </ChakraProvider>
      </CacheProvider>
    </>
  );
}
