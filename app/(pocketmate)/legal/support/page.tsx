"use client";

import { PMCard } from "@/components/pocketmate/PMCard";
import { Heading, Link as ChakraLink, Text, VStack } from "@chakra-ui/react";

export default function LegalSupportPage() {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim();

  return (
    <VStack align="stretch" spacing={6} maxW="720px">
      <VStack align="start" spacing={2}>
        <Heading
          size="lg"
          fontFamily="var(--font-pm-heading), system-ui, sans-serif"
          color="pm.text"
        >
          Support
        </Heading>
        <Text color="pm.muted" fontSize="sm">
          For classroom pilots, institutions, or product feedback, use the
          contact channel your team configures below.
        </Text>
      </VStack>

      <PMCard>
        <VStack align="stretch" spacing={4}>
          <Text fontSize="sm" color="pm.text" fontWeight="semibold">
            Contact
          </Text>
          {supportEmail ? (
            <Text fontSize="sm" color="pm.muted">
              Email:{" "}
              <ChakraLink
                href={`mailto:${supportEmail}`}
                color="pm.primarySoft"
                textDecor="underline"
              >
                {supportEmail}
              </ChakraLink>
            </Text>
          ) : (
            <Text fontSize="sm" color="pm.muted">
              Set <code>NEXT_PUBLIC_SUPPORT_EMAIL</code> in your deployment
              environment so this page shows a mailbox for students and staff.
            </Text>
          )}
          <Text fontSize="xs" color="pm.muted">
            Legacy community routes if needed:{" "}
            <ChakraLink
              href="/community"
              color="pm.primarySoft"
              textDecor="underline"
            >
              /community
            </ChakraLink>
            .
          </Text>
        </VStack>
      </PMCard>
    </VStack>
  );
}
