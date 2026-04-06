"use client";

import { PocketMateStubPage } from "@/components/pocketmate/PocketMateStubPage";
import { Link as ChakraLink, Text } from "@chakra-ui/react";
import { PMCard } from "@/components/pocketmate/PMCard";
import NextLink from "next/link";

export default function HubPage() {
  return (
    <>
      <PocketMateStubPage
        title="Community hub"
        description="Strategy discussions, leaderboards, and university competition. Legacy DefiKids social links still live at /community."
        accent="This route is /hub so it does not replace the existing DefiKids /community page."
      />
      <PMCard mt={6}>
        <Text color="pm.muted" fontSize="sm">
          Looking for the original DefiKids community page?{" "}
          <ChakraLink as={NextLink} href="/community" color="pm.primarySoft" textDecor="underline">
            Open /community
          </ChakraLink>
        </Text>
      </PMCard>
    </>
  );
}
