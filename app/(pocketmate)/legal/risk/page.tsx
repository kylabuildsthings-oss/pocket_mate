"use client";

import { PMCard } from "@/components/pocketmate/PMCard";
import {
  Heading,
  Link as ChakraLink,
  ListItem,
  OrderedList,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function LegalRiskPage() {
  return (
    <VStack align="stretch" spacing={6} maxW="720px">
      <VStack align="start" spacing={2}>
        <Heading
          size="lg"
          fontFamily="var(--font-pm-heading), system-ui, sans-serif"
          color="pm.text"
        >
          Risk disclosures
        </Heading>
        <Text color="pm.muted" fontSize="sm">
          PocketMate is built for learning. The information and tools here are
          not investment, legal, or tax advice. Always do your own research and
          consult professionals before using real funds.
        </Text>
      </VStack>

      <PMCard>
        <VStack align="stretch" spacing={4}>
          <Text fontSize="sm" color="pm.text" fontWeight="semibold">
            Simulation vs Live
          </Text>
          <OrderedList spacing={2} pl={1} fontSize="sm" color="pm.muted">
            <ListItem>
              <Text as="span" color="pm.text" fontWeight="semibold">
                Demo mode
              </Text>{" "}
              uses paper balances and simulated execution only. No blockchain
              transactions are sent.
            </ListItem>
            <ListItem>
              <Text as="span" color="pm.text" fontWeight="semibold">
                Live mode
              </Text>{" "}
              may show read-only wallet data; MVP execution flows remain clearly
              labeled as simulated until you ship production trading.
            </ListItem>
            <ListItem>
              Crypto assets are volatile. You can lose some or all of your
              capital, including from bugs, scams, or network congestion.
            </ListItem>
          </OrderedList>
        </VStack>
      </PMCard>

      <PMCard>
        <VStack align="stretch" spacing={3}>
          <Text fontSize="sm" color="pm.text" fontWeight="semibold">
            Third parties
          </Text>
          <Text fontSize="sm" color="pm.muted" lineHeight="tall">
            Wallet connectors, RPC providers, and price feeds are operated by
            third parties. PocketMate does not control them. Review their terms
            and privacy policies directly.
          </Text>
        </VStack>
      </PMCard>

      <Text fontSize="xs" color="pm.muted">
        Questions? See{" "}
        <ChakraLink
          as={NextLink}
          href="/legal/support"
          color="pm.primarySoft"
          textDecor="underline"
        >
          Support
        </ChakraLink>
        .
      </Text>
    </VStack>
  );
}
