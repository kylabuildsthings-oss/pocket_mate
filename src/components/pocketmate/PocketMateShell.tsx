"use client";

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  MdBook,
  MdConstruction,
  MdDashboard,
  MdGroups,
  MdMenu,
  MdPerson,
  MdSchool,
  MdSettings,
  MdShowChart,
} from "react-icons/md";
import { POCKETMATE_NAV } from "@/lib/pocketmateNav";
import { PMBadge } from "./PMBadge";

const iconFor = (href: string) => {
  switch (href) {
    case "/dashboard":
      return MdDashboard;
    case "/learn":
      return MdSchool;
    case "/trade":
      return MdShowChart;
    case "/build":
      return MdConstruction;
    case "/glossary":
      return MdBook;
    case "/hub":
      return MdGroups;
    case "/profile":
      return MdPerson;
    case "/settings":
      return MdSettings;
    default:
      return MdDashboard;
  }
};

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <VStack align="stretch" spacing={1}>
      {POCKETMATE_NAV.map(({ href, label }) => {
        const active = pathname === href || pathname?.startsWith(`${href}/`);
        const NavIcon = iconFor(href);
        return (
          <Link key={href} href={href} onClick={onNavigate}>
            <Flex
              align="center"
              gap={3}
              px={3}
              py={2.5}
              borderRadius="lg"
              bg={active ? "pm.surfaceHover" : "transparent"}
              borderWidth="1px"
              borderColor={active ? "pm.primarySoft" : "transparent"}
              color={active ? "pm.text" : "pm.muted"}
              _hover={{
                bg: "pm.surfaceHover",
                color: "pm.text",
              }}
            >
              <Icon as={NavIcon} boxSize={5} flexShrink={0} />
              <Text fontSize="sm" fontWeight={active ? "semibold" : "medium"}>
                {label}
              </Text>
            </Flex>
          </Link>
        );
      })}
    </VStack>
  );
}

function titleForPath(pathname: string | null): string {
  if (!pathname) return "PocketMate";
  const item = POCKETMATE_NAV.find((n) => pathname === n.href || pathname.startsWith(`${n.href}/`));
  return item?.label ?? "PocketMate";
}

export function PocketMateShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const pageTitle = titleForPath(pathname);

  const sidebar = (
    <Flex direction="column" h="full" px={3} py={6}>
      <Box px={2} mb={8}>
        <Heading
          as="p"
          size="md"
          fontFamily="var(--font-pm-heading), system-ui, sans-serif"
          color="pm.text"
          letterSpacing="tight"
        >
          PocketMate
        </Heading>
        <Text fontSize="xs" color="pm.muted" mt={1} letterSpacing="widest">
          LEARN · TRADE · BUILD
        </Text>
      </Box>
      <NavLinks onNavigate={isMobile ? onClose : undefined} />
      <Box mt="auto" pt={6} px={2}>
        <Text fontSize="xs" color="pm.muted">
          The Sovereign Ledger
        </Text>
        <Text fontSize="xs" color="pm.muted">
          Institutional-grade sandbox
        </Text>
      </Box>
    </Flex>
  );

  return (
    <Flex
      minH="100vh"
      bg="pm.bg"
      color="pm.text"
      fontFamily="var(--font-pm-body), system-ui, sans-serif"
    >
      {!isMobile ? (
        <Box
          as="aside"
          w="260px"
          flexShrink={0}
          borderRightWidth="1px"
          borderColor="pm.border"
          bg="pm.surface"
        >
          {sidebar}
        </Box>
      ) : null}

      <Flex direction="column" flex="1" minW={0}>
        <Flex
          as="header"
          align="center"
          justify="space-between"
          px={{ base: 4, md: 8 }}
          py={4}
          borderBottomWidth="1px"
          borderColor="pm.border"
          bg="pm.surface"
          position="sticky"
          top={0}
          zIndex={10}
        >
          <Flex align="center" gap={3}>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="Open menu"
                  icon={<MdMenu size={22} />}
                  variant="ghost"
                  color="pm.text"
                  onClick={onOpen}
                />
                <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
                  <DrawerOverlay />
                  <DrawerContent bg="pm.surface" borderRightWidth="1px" borderColor="pm.border">
                    <DrawerCloseButton color="pm.muted" />
                    <DrawerHeader
                      color="pm.text"
                      fontFamily="var(--font-pm-heading), system-ui, sans-serif"
                    >
                      PocketMate
                    </DrawerHeader>
                    <DrawerBody px={2}>{sidebar}</DrawerBody>
                  </DrawerContent>
                </Drawer>
              </>
            ) : null}
            <Box>
              <Heading
                size="md"
                fontFamily="var(--font-pm-heading), system-ui, sans-serif"
                color="pm.text"
              >
                {pageTitle}
              </Heading>
              <Text fontSize="xs" color="pm.muted" display={{ base: "none", sm: "block" }}>
                Student DeFi workspace
              </Text>
            </Box>
          </Flex>
          <Flex align="center" gap={3}>
            <Tooltip label="Demo/Live toggle ships in the next milestone" hasArrow>
              <Box>
                <PMBadge tone="primary">Demo</PMBadge>
              </Box>
            </Tooltip>
            <ConnectButton />
          </Flex>
        </Flex>
        <Box as="main" flex="1" px={{ base: 4, md: 8 }} py={{ base: 6, md: 8 }}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
