"use client";

import { Tabs, type TabsProps } from "@chakra-ui/react";

export type PMTabsProps = TabsProps;

export function PMTabs(props: PMTabsProps) {
  return (
    <Tabs
      variant="soft-rounded"
      colorScheme="purple"
      sx={{
        ".chakra-tabs__tab": { color: "pm.muted" },
        ".chakra-tabs__tab[aria-selected=true]": {
          bg: "pm.surfaceHover",
          color: "pm.text",
        },
      }}
      {...props}
    />
  );
}
