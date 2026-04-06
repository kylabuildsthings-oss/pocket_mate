"use client";

import { Box, type BoxProps } from "@chakra-ui/react";

export type PMCardProps = BoxProps;

export function PMCard({ children, ...props }: PMCardProps) {
  return (
    <Box
      bg="pm.surface"
      borderWidth="1px"
      borderColor="pm.border"
      borderRadius="xl"
      p={{ base: 4, md: 6 }}
      transition="border-color 0.2s, box-shadow 0.2s"
      _hover={{ borderColor: "pm.primarySoft", boxShadow: "md" }}
      {...props}
    >
      {children}
    </Box>
  );
}
