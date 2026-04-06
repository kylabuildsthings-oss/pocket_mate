"use client";

import { PMCard } from "@/components/pocketmate/PMCard";
import { PMBadge } from "@/components/pocketmate/PMBadge";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link as ChakraLink,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  MdBarChart,
  MdBook,
  MdChangeHistory,
  MdDescription,
  MdGavel,
  MdBrush,
  MdSchool,
  MdShowChart,
  MdWarehouse,
} from "react-icons/md";
import { FaGithub, FaStar } from "react-icons/fa";

const SIDE_NAV = [
  { id: "open-source", label: "Open Source" },
  { id: "institutional-grade", label: "Institutional Grade" },
  { id: "documentation", label: "Documentation" },
  { id: "credits", label: "Credits" },
  { id: "licenses", label: "Licenses" },
  { id: "changelog", label: "Changelog" },
] as const;

const TOP_NAV = [
  { label: "Academy", href: "/learn", icon: MdSchool },
  { label: "Ledger", href: "/trade", icon: MdShowChart },
  { label: "Vault", href: "/build", icon: MdWarehouse },
  { label: "Governance", href: "/hub", icon: MdGavel },
] as const;

const PROJECTS = [
  {
    name: "defikids-dapp",
    byline: "By the DefiKids team",
    description:
      "Educational patterns and gamification logic that simplify complex blockchain interactions for a student-centric audience.",
    href: "https://github.com/defikids/defikids-dapp",
    starsLabel: "400+",
    badge: "core dependency" as const,
    icon: MdSchool,
  },
  {
    name: "freqtrade",
    byline: "By Matthias & contributors",
    description:
      "An institutional-grade trading bot engine providing the robust backtesting and execution environment for PocketMate.",
    href: "https://github.com/freqtrade/freqtrade",
    starsLabel: "48k+",
    badge: "core dependency" as const,
    icon: MdBarChart,
  },
  {
    name: "gem-ios",
    byline: "By Gem Wallet team",
    description:
      "Industry-leading wallet UI patterns and user flows that helped shape our high-fidelity institutional mobile experience.",
    href: "https://github.com/gemwalletcom/gem-ios",
    starsLabel: "500+",
    badge: "design inspiration" as const,
    icon: MdBrush,
  },
] as const;

function SubtleGridBg() {
  const line = "rgba(99, 102, 241, 0.08)";
  return (
    <Box
      position="absolute"
      inset={0}
      pointerEvents="none"
      bgImage={`linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`}
      bgSize="48px 48px"
      borderRadius="xl"
      zIndex={0}
    />
  );
}

export function AboutPage() {
  const statusUrl = process.env.NEXT_PUBLIC_STATUS_PAGE_URL?.trim();
  const repoSecurity =
    "https://github.com/kylabuildsthings-oss/pocket_mate/security";

  return (
    <Flex
      align="flex-start"
      gap={{ base: 0, lg: 8 }}
      position="relative"
      maxW="1200px"
      mx="auto"
      flexDirection={{ base: "column", lg: "row" }}
    >
      <Box
        display={{ base: "block", lg: "none" }}
        w="full"
        mb={6}
        order={{ base: 0, lg: 2 }}
      >
        <Text fontSize="xs" color="pm.muted" mb={2} fontWeight="semibold">
          Jump to section
        </Text>
        <Flex gap={2} flexWrap="wrap">
          {SIDE_NAV.map((item) => (
            <ChakraLink
              key={item.id}
              href={`#${item.id}`}
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="md"
              borderWidth="1px"
              borderColor="pm.border"
              color="pm.muted"
              _hover={{ color: "pm.text", borderColor: "pm.primarySoft" }}
            >
              {item.label}
            </ChakraLink>
          ))}
        </Flex>
      </Box>

      <Box
        as="nav"
        aria-label="About sections"
        display={{ base: "none", lg: "block" }}
        w="200px"
        flexShrink={0}
        position="sticky"
        top="88px"
        alignSelf="flex-start"
      >
        <VStack align="stretch" spacing={0}>
          {SIDE_NAV.map((item) => (
            <ChakraLink
              key={item.id}
              href={`#${item.id}`}
              py={2.5}
              px={3}
              borderRadius="lg"
              fontSize="sm"
              fontWeight="medium"
              color="pm.muted"
              borderLeftWidth="3px"
              borderColor="transparent"
              _hover={{
                bg: "pm.surfaceHover",
                color: "pm.text",
              }}
              _focusVisible={{
                outline: "2px solid",
                outlineColor: "pm.primarySoft",
              }}
            >
              {item.label}
            </ChakraLink>
          ))}
        </VStack>
      </Box>

      <Box flex="1" minW={0} position="relative">
        <Box
          overflowX="auto"
          pb={3}
          mb={6}
          borderBottomWidth="1px"
          borderColor="pm.border"
          sx={{
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": { height: "6px" },
            "&::-webkit-scrollbar-thumb": {
              background: "var(--chakra-colors-pm-border)",
              borderRadius: "full",
            },
          }}
        >
          <Flex
            as="nav"
            aria-label="Product areas"
            gap={{ base: 4, md: 8 }}
            whiteSpace="nowrap"
          >
            {TOP_NAV.map(({ label, href, icon }) => (
              <Link key={href} href={href}>
                <Flex
                  align="center"
                  gap={2}
                  py={2}
                  px={1}
                  color="pm.muted"
                  fontSize="xs"
                  fontWeight="semibold"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  borderBottomWidth="2px"
                  borderColor="transparent"
                  _hover={{
                    color: "pm.text",
                    borderColor: "pm.primarySoft",
                  }}
                  transition="color 0.2s, border-color 0.2s"
                >
                  <Icon as={icon} boxSize={4} opacity={0.85} />
                  {label}
                </Flex>
              </Link>
            ))}
          </Flex>
        </Box>

        <Box mb={10} position="relative">
          <Heading
            as="h1"
            size="xl"
            fontFamily="var(--font-pm-heading), system-ui, sans-serif"
            color="pm.text"
            mb={2}
          >
            About PocketMate
          </Heading>
          <Text fontSize="lg" color="pm.muted" fontWeight="medium">
            Learn. Trade. Build. — DeFi for students
          </Text>
        </Box>

        <VStack align="stretch" spacing={12} pb={16}>
          <Box id="open-source" scrollMarginTop="100px" position="relative">
            <PMCard position="relative" overflow="hidden">
              <SubtleGridBg />
              <VStack
                align="stretch"
                spacing={4}
                position="relative"
                zIndex={1}
              >
                <Text fontSize="2xl" aria-hidden>
                  🙏
                </Text>
                <Heading
                  as="h2"
                  size="md"
                  fontFamily="var(--font-pm-heading), system-ui, sans-serif"
                >
                  Open Source Acknowledgments
                </Heading>
                <Text color="pm.muted" fontSize="sm" lineHeight="tall">
                  PocketMate represents the intersection of community-driven
                  innovation and institutional precision. We stand on the
                  shoulders of giants; this platform exists thanks to the
                  open-source community that empowers the next generation of
                  builders and researchers.
                </Text>
              </VStack>
            </PMCard>
          </Box>

          <Box id="institutional-grade" scrollMarginTop="100px">
            <Heading
              as="h2"
              size="sm"
              fontFamily="var(--font-pm-heading), system-ui, sans-serif"
              color="pm.muted"
              letterSpacing="wider"
              textTransform="uppercase"
              mb={4}
            >
              Institutional Grade
            </Heading>
            <Text color="pm.muted" fontSize="sm" maxW="3xl" mb={6}>
              PocketMate pairs pedagogy with execution surfaces: guided
              practice, explicit live-mode gates, and strategy tooling suitable
              for structured programs—not anonymous mainnet experimentation
              without guardrails.
            </Text>
          </Box>

          <Box id="documentation" scrollMarginTop="100px">
            <Heading
              as="h2"
              size="sm"
              fontFamily="var(--font-pm-heading), system-ui, sans-serif"
              color="pm.muted"
              letterSpacing="wider"
              textTransform="uppercase"
              mb={4}
            >
              Documentation
            </Heading>
            <PMCard>
              <Flex align="center" gap={3}>
                <Icon as={MdBook} boxSize={6} color="pm.primarySoft" />
                <Text color="pm.muted" fontSize="sm">
                  Product documentation lives alongside the repo. Start with{" "}
                  <ChakraLink
                    href="https://github.com/kylabuildsthings-oss/pocket_mate"
                    isExternal
                    color="pm.primarySoft"
                    fontWeight="semibold"
                  >
                    README
                  </ChakraLink>{" "}
                  and in-app{" "}
                  <ChakraLink
                    as={Link}
                    href="/learn"
                    color="pm.primarySoft"
                    fontWeight="semibold"
                  >
                    Learn
                  </ChakraLink>{" "}
                  lessons.
                </Text>
              </Flex>
            </PMCard>
          </Box>

          <Box id="credits" scrollMarginTop="100px">
            <Heading
              as="h2"
              size="sm"
              fontFamily="var(--font-pm-heading), system-ui, sans-serif"
              color="pm.muted"
              letterSpacing="wider"
              textTransform="uppercase"
              mb={4}
            >
              Credits
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
              {PROJECTS.map((p) => (
                <PMCard
                  key={p.name}
                  display="flex"
                  flexDirection="column"
                  _hover={{ borderColor: "pm.primarySoft" }}
                  p={5}
                >
                  <Flex justify="space-between" align="flex-start" mb={4}>
                    <Flex
                      align="center"
                      justify="center"
                      w={11}
                      h={11}
                      borderRadius="lg"
                      bg="pm.surfaceHover"
                      borderWidth="1px"
                      borderColor="pm.border"
                      color="pm.primarySoft"
                    >
                      <Icon as={p.icon} boxSize={6} aria-hidden />
                    </Flex>
                    <PMBadge tone="primary" fontSize="xs">
                      {p.starsLabel} ★
                    </PMBadge>
                  </Flex>
                  <PMBadge
                    tone={
                      p.badge === "design inspiration" ? "default" : "primary"
                    }
                    mb={2}
                    alignSelf="flex-start"
                  >
                    {p.badge}
                  </PMBadge>
                  <Heading
                    as="h3"
                    size="sm"
                    color="pm.text"
                    mb={1}
                    fontFamily="var(--font-pm-body), system-ui, sans-serif"
                    fontWeight="bold"
                  >
                    {p.name}
                  </Heading>
                  <Text fontSize="xs" color="pm.muted" mb={3}>
                    {p.byline}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="pm.muted"
                    flex="1"
                    mb={4}
                    lineHeight="tall"
                  >
                    {p.description}
                  </Text>
                  <Button
                    as="a"
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                    variant="outline"
                    borderColor="pm.border"
                    color="pm.text"
                    leftIcon={<FaGithub />}
                    _hover={{
                      bg: "pm.surfaceHover",
                      borderColor: "pm.primarySoft",
                    }}
                  >
                    View on GitHub →
                  </Button>
                </PMCard>
              ))}
            </SimpleGrid>

            <VStack spacing={4} mt={12} align="stretch">
              <Text
                fontSize="xs"
                letterSpacing="0.25em"
                color="pm.muted"
                textAlign="center"
                textTransform="uppercase"
              >
                Support the ecosystem
              </Text>
              <Heading
                as="h3"
                size="md"
                textAlign="center"
                fontFamily="var(--font-pm-heading), system-ui, sans-serif"
              >
                ⭐ Show Your Support
              </Heading>
              <Flex
                gap={3}
                justify="center"
                flexWrap="wrap"
                align={{ base: "stretch", sm: "center" }}
              >
                {PROJECTS.map((p) => (
                  <Button
                    key={p.name}
                    as="a"
                    href={`${p.href}/stargazers`}
                    target="_blank"
                    rel="noopener noreferrer"
                    leftIcon={<FaStar />}
                    size="sm"
                    bg="pm.surfaceHover"
                    borderWidth="1px"
                    borderColor="pm.border"
                    color="pm.text"
                    _hover={{
                      borderColor: "pm.primarySoft",
                      color: "pm.primarySoft",
                    }}
                  >
                    Star {p.name}
                  </Button>
                ))}
              </Flex>
            </VStack>
          </Box>

          <Box id="licenses" scrollMarginTop="100px">
            <Heading
              as="h2"
              size="sm"
              fontFamily="var(--font-pm-heading), system-ui, sans-serif"
              color="pm.muted"
              letterSpacing="wider"
              textTransform="uppercase"
              mb={4}
            >
              Licenses
            </Heading>
            <PMCard>
              <Flex align="flex-start" gap={3}>
                <Icon
                  as={MdDescription}
                  boxSize={6}
                  color="pm.primarySoft"
                  flexShrink={0}
                />
                <Text color="pm.muted" fontSize="sm" lineHeight="tall">
                  PocketMate is released under the MIT License (see{" "}
                  <ChakraLink
                    href="https://github.com/kylabuildsthings-oss/pocket_mate/blob/develop/LICENSE"
                    isExternal
                    color="pm.primarySoft"
                  >
                    LICENSE
                  </ChakraLink>
                  ). Upstream and dependency licenses apply to their respective
                  projects—review each repository before redistribution.
                </Text>
              </Flex>
            </PMCard>
          </Box>

          <Box id="changelog" scrollMarginTop="100px">
            <Heading
              as="h2"
              size="sm"
              fontFamily="var(--font-pm-heading), system-ui, sans-serif"
              color="pm.muted"
              letterSpacing="wider"
              textTransform="uppercase"
              mb={4}
            >
              Changelog
            </Heading>
            <PMCard>
              <Flex align="flex-start" gap={3}>
                <Icon
                  as={MdChangeHistory}
                  boxSize={6}
                  color="pm.primarySoft"
                  flexShrink={0}
                />
                <Text color="pm.muted" fontSize="sm">
                  Follow release notes and commit history on{" "}
                  <ChakraLink
                    href="https://github.com/kylabuildsthings-oss/pocket_mate/commits/develop"
                    isExternal
                    color="pm.primarySoft"
                  >
                    GitHub
                  </ChakraLink>
                  .
                </Text>
              </Flex>
            </PMCard>
          </Box>

          <Box
            as="footer"
            mt={4}
            pt={8}
            borderTopWidth="1px"
            borderColor="pm.border"
          >
            <VStack spacing={6} align="stretch">
              <Flex justify="center" align="center" gap={2}>
                <Box
                  w={2}
                  h={2}
                  borderRadius="full"
                  bg="pm.primarySoft"
                  boxShadow="0 0 10px var(--chakra-colors-pm-primarySoft)"
                  aria-hidden
                />
                <ChakraLink
                  href={
                    statusUrl ??
                    "https://github.com/kylabuildsthings-oss/pocket_mate"
                  }
                  isExternal
                  fontSize="xs"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  color="pm.muted"
                  fontWeight="semibold"
                  _hover={{ color: "pm.primarySoft" }}
                >
                  Live ecosystem sync
                </ChakraLink>
              </Flex>
              <Text
                fontSize="xs"
                color="pm.muted"
                textAlign="center"
                lineHeight="tall"
              >
                PocketMate is not affiliated with these projects. All trademarks
                belong to their respective owners.
              </Text>
              <Flex
                justify="center"
                gap={{ base: 4, md: 10 }}
                flexWrap="wrap"
                fontSize="xs"
                letterSpacing="0.15em"
                textTransform="uppercase"
              >
                <ChakraLink as={Link} href="/legal/risk" color="pm.primarySoft">
                  Terms of use
                </ChakraLink>
                <ChakraLink
                  as={Link}
                  href="/legal/support"
                  color="pm.primarySoft"
                >
                  Privacy encryption
                </ChakraLink>
                <ChakraLink
                  href={repoSecurity}
                  isExternal
                  color="pm.primarySoft"
                >
                  Security protocol
                </ChakraLink>
              </Flex>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
}
