"use client";

import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";

export default function ComingSoon() {
  return (
    <Box minH="100vh" bg="pm.bg" color="pm.text">
      <Flex
        align="center"
        justify="space-between"
        px={{ base: 4, md: 8 }}
        py={5}
        borderBottomWidth="1px"
        borderColor="pm.border"
        bg="pm.surface"
      >
        <VStack align="start" spacing={0.5}>
          <Heading
            size="md"
            fontFamily="var(--font-pm-heading), system-ui, sans-serif"
            color="pm.text"
            letterSpacing="tight"
          >
            PocketMate
          </Heading>
          <Text fontSize="xs" color="pm.muted" letterSpacing="widest">
            LEARN · TRADE · BUILD
          </Text>
        </VStack>
        <Text
          fontSize="xs"
          color="pm.muted"
          display={{ base: "none", sm: "block" }}
        >
          The Sovereign Ledger
        </Text>
      </Flex>

      <Flex align="center" justify="center" px={4} py={{ base: 12, md: 20 }}>
        <Box
          bg="pm.surface"
          borderWidth="1px"
          borderColor="pm.border"
          borderRadius="xl"
          p={{ base: 8, md: 10 }}
          maxW="lg"
          w="full"
          textAlign="center"
          boxShadow="dark-lg"
        >
          <VStack spacing={5}>
            <Heading
              as="h1"
              size="lg"
              fontFamily="var(--font-pm-heading), system-ui, sans-serif"
              color="pm.text"
            >
              Student DeFi workspace
            </Heading>
            <Text
              color="pm.muted"
              fontSize="md"
              lineHeight="tall"
              maxW="md"
              mx="auto"
            >
              PocketMate is live in your browser: Demo and Live modes, Learn,
              Trade, and progress tools share the same dark shell—no separate
              marketing chrome.
            </Text>
            <Button
              as={NextLink}
              href="/dashboard"
              data-testid="landing-open-dashboard"
              size="lg"
              width="full"
              maxW="sm"
              bg="pm.primarySoft"
              color="white"
              borderRadius="lg"
              fontWeight="semibold"
              _hover={{ bg: "pm.accent", color: "white" }}
              _active={{ bg: "pm.primary" }}
            >
              Open dashboard
            </Button>
            <Button
              as={NextLink}
              href="/learn"
              variant="ghost"
              size="sm"
              color="pm.muted"
              _hover={{ color: "pm.text", bg: "pm.surfaceHover" }}
            >
              Go to Learn
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}
