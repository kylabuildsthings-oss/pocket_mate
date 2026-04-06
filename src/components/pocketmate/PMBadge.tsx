"use client";

import { Badge, type BadgeProps } from "@chakra-ui/react";

export type PMBadgeProps = BadgeProps & {
  tone?: "default" | "success" | "warning" | "danger" | "primary";
};

const toneMap: Record<NonNullable<PMBadgeProps["tone"]>, string> = {
  default: "pm.border",
  success: "green.500",
  warning: "pm.warning",
  danger: "pm.danger",
  primary: "pm.primarySoft",
};

export function PMBadge({ tone = "default", ...props }: PMBadgeProps) {
  return (
    <Badge
      borderRadius="full"
      px={2}
      py={0.5}
      fontSize="xs"
      textTransform="uppercase"
      letterSpacing="wider"
      bg="pm.surfaceHover"
      color="pm.text"
      borderWidth="1px"
      borderColor={toneMap[tone]}
      {...props}
    />
  );
}
