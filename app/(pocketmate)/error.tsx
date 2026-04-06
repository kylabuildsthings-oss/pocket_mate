"use client";

import { reportClientError } from "@/lib/monitoring/reportClientError";
import { Button, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";

export default function PocketMateError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportClientError({
      source: "pocketmate-route-error",
      message: error?.message || "Unknown route error",
      digest: error?.digest,
      stack: error?.stack,
    });
  }, [error]);

  return (
    <VStack align="stretch" spacing={6} py={12} maxW="lg">
      <Text fontSize="lg" fontWeight="semibold" color="pm.text">
        Something went wrong
      </Text>
      <Text fontSize="sm" color="pm.muted">
        This page hit an unexpected error. You can retry, or use the sidebar to
        navigate elsewhere.
      </Text>
      <Button colorScheme="purple" w="fit-content" onClick={() => reset()}>
        Try again
      </Button>
    </VStack>
  );
}
