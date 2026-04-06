"use client";

import { PocketMateCloudAccount } from "@/components/pocketmate/settings/PocketMateCloudAccount";
import { PocketMateStubPage } from "@/components/pocketmate/PocketMateStubPage";
import { VStack } from "@chakra-ui/react";

export default function SettingsPage() {
  return (
    <VStack align="stretch" spacing={8}>
      <PocketMateStubPage
        title="Settings"
        description="Wallet, notifications, risk disclosures, and Demo/Live preferences will live here."
      />
      <PocketMateCloudAccount />
    </VStack>
  );
}
