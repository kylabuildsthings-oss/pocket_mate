"use client";

import { Box, Flex, Link as ChakraLink, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export function PocketMateFooter() {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim();
  const statusUrl = process.env.NEXT_PUBLIC_STATUS_PAGE_URL?.trim();

  return (
    <Box
      as="footer"
      mt="auto"
      px={{ base: 4, md: 8 }}
      py={5}
      borderTopWidth="1px"
      borderColor="pm.border"
      bg="pm.surface"
    >
      <Flex
        align="center"
        justify="space-between"
        gap={4}
        flexWrap="wrap"
        fontSize="xs"
        color="pm.muted"
      >
        <Flex gap={4} flexWrap="wrap" align="center">
          <ChakraLink
            as={NextLink}
            href="/legal/risk"
            color="pm.primarySoft"
            textDecor="underline"
          >
            Risk disclosures
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/legal/support"
            color="pm.primarySoft"
            textDecor="underline"
          >
            Support
          </ChakraLink>
          {statusUrl ? (
            <ChakraLink
              href={statusUrl}
              isExternal
              color="pm.primarySoft"
              textDecor="underline"
            >
              Status
            </ChakraLink>
          ) : null}
        </Flex>
        {supportEmail ? (
          <Text as="span">
            Help:{" "}
            <ChakraLink
              href={`mailto:${supportEmail}`}
              color="pm.primarySoft"
              textDecor="underline"
            >
              {supportEmail}
            </ChakraLink>
          </Text>
        ) : (
          <Text as="span">Educational sandbox — not investment advice.</Text>
        )}
      </Flex>
    </Box>
  );
}
