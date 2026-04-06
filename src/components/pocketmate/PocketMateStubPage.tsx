"use client";

import {
  Heading,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PMCard } from "./PMCard";
import { PMStat } from "./PMStat";
import { PMTabs } from "./PMTabs";
import { useModeStore } from "@/store/mode/useModeStore";
import { getModeAwareContext } from "@/lib/modeAware";

export function PocketMateStubPage({
  title,
  description,
  accent = "Placeholder content for this module. Wiring Demo/Live, data, and flows comes in later gates.",
}: {
  title: string;
  description: string;
  accent?: string;
}) {
  const mode = useModeStore((state) => state.mode);
  const modeContext = getModeAwareContext(mode);

  return (
    <VStack align="stretch" spacing={8}>
      <VStack align="start" spacing={2}>
        <Heading
          size="lg"
          fontFamily="var(--font-pm-heading), system-ui, sans-serif"
          color="pm.text"
        >
          {title}
        </Heading>
        <Text color="pm.muted" maxW="2xl">
          {description}
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        <PMStat label="Phase" value="3" hint="App shell + navigation" />
        <PMStat
          label="Mode"
          value={mode === "live" ? "Live" : "Demo"}
          hint={modeContext.riskLabel}
        />
        <PMStat
          label="Execution"
          value="Hybrid"
          hint={modeContext.executionLabel}
        />
      </SimpleGrid>

      <PMCard>
        <Text color="pm.muted" mb={4}>
          {accent}
        </Text>
        <PMTabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Next steps</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0} pt={4}>
              <Text color="pm.text">
                This route is wired into the PocketMate shell. Use the sidebar
                to move between Learn, Trade, Build, and reference surfaces.
              </Text>
            </TabPanel>
            <TabPanel px={0} pt={4}>
              <Text color="pm.text">
                Next: global Demo/Live toggle, mode-aware providers, and
                page-specific layouts (dashboard widgets, lesson flows, trade
                hybrid UI).
              </Text>
            </TabPanel>
          </TabPanels>
        </PMTabs>
      </PMCard>
    </VStack>
  );
}
