"use client";

import { Flex, Spinner, Text, VStack } from "@chakra-ui/react";

export default function PocketMateLoading() {
  return (
    <Flex minH="40vh" align="center" justify="center" py={16}>
      <VStack spacing={4}>
        <Spinner
          size="xl"
          color="pm.primarySoft"
          thickness="4px"
          speed="0.65s"
          aria-label="Loading"
        />
        <Text fontSize="sm" color="pm.muted">
          Loading…
        </Text>
      </VStack>
    </Flex>
  );
}
