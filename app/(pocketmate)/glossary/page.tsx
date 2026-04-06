"use client";

import { PMCard } from "@/components/pocketmate/PMCard";
import { GLOSSARY_CATEGORIES, GLOSSARY_TERMS } from "@/data/learn/glossary";
import type { GlossaryCategory } from "@/lib/learn/types";
import {
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link as ChakraLink,
  Select,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { MdSearch } from "react-icons/md";

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<GlossaryCategory | "all">("all");

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "");
    if (!raw) return;
    window.setTimeout(() => {
      document
        .getElementById(raw)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY_TERMS.filter((t) => {
      if (category !== "all" && t.category !== category) return false;
      if (!q) return true;
      return (
        t.term.toLowerCase().includes(q) ||
        t.short.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  return (
    <VStack align="stretch" spacing={8}>
      <VStack align="start" spacing={2}>
        <Heading
          size="lg"
          fontFamily="var(--font-pm-heading), system-ui, sans-serif"
          color="pm.text"
        >
          Glossary
        </Heading>
        <Text color="pm.muted" maxW="3xl">
          Search and filter institutional-friendly definitions. Lesson pages
          link here with anchors like{" "}
          <Text as="span" fontFamily="mono">
            /glossary#term-wallet
          </Text>
          .
        </Text>
      </VStack>

      <InputGroup>
        <InputLeftElement pointerEvents="none" h="full">
          <MdSearch color="gray" />
        </InputLeftElement>
        <Input
          placeholder="Search terms or definitions…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          bg="pm.surface"
          borderColor="pm.border"
          color="pm.text"
          _placeholder={{ color: "pm.muted" }}
        />
      </InputGroup>

      <Select
        maxW={{ base: "full", md: "280px" }}
        value={category}
        onChange={(e) =>
          setCategory(e.target.value as GlossaryCategory | "all")
        }
        bg="pm.surface"
        borderColor="pm.border"
        color="pm.text"
      >
        <option value="all">All categories</option>
        {GLOSSARY_CATEGORIES.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </Select>

      <Text fontSize="sm" color="pm.muted">
        Showing {filtered.length} of {GLOSSARY_TERMS.length} terms
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {filtered.map((t) => (
          <PMCard
            key={t.id}
            id={`term-${t.id}`}
            scrollMarginTop="100px"
            sx={{
              "&:target": {
                boxShadow: "0 0 0 2px var(--chakra-colors-purple-400)",
              },
            }}
          >
            <Text fontWeight="bold" color="pm.text" mb={1}>
              {t.term}
            </Text>
            <Text
              fontSize="xs"
              color="pm.muted"
              textTransform="uppercase"
              letterSpacing="wider"
              mb={3}
            >
              {GLOSSARY_CATEGORIES.find((c) => c.id === t.category)?.label ??
                t.category}
            </Text>
            <Text fontSize="sm" color="pm.text" fontWeight="medium" mb={2}>
              {t.short}
            </Text>
            <Text fontSize="sm" color="pm.muted" lineHeight="tall">
              {t.definition}
            </Text>
          </PMCard>
        ))}
      </SimpleGrid>

      <Text fontSize="xs" color="pm.muted" maxW="3xl" lineHeight="short">
        Additional entries summarize common intro-course vocabulary (e.g. RMIT /
        FutureLearn “DeFi glossary”{" "}
        <ChakraLink
          href="https://www.futurelearn.com/info/courses/defi-exploring-decentralised-finance-with-blockchain-technologies/0/steps/251892"
          color="pm.primarySoft"
          textDecor="underline"
          isExternal
        >
          futurelearn.com
        </ChakraLink>
        ). Not legal or investment advice; verify against primary sources for
        coursework.
      </Text>
    </VStack>
  );
}
