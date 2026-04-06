"use client";

import type { LessonBlock } from "@/lib/learn/types";
import { glossaryById } from "@/data/learn/glossary";
import {
  ListItem,
  Text,
  Tooltip,
  UnorderedList,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";

function TermHint({ termId, label }: { termId: string; label: string }) {
  const entry = glossaryById(termId);
  const href = `/glossary#term-${termId}`;

  return (
    <Tooltip
      label={
        entry ? (
          <>
            <Text as="span" fontWeight="semibold">
              {entry.term}
            </Text>
            {" — "}
            {entry.short}
          </>
        ) : (
          "Open glossary"
        )
      }
      placement="top"
      hasArrow
      bg="pm.surface"
      color="pm.text"
      borderWidth="1px"
      borderColor="pm.border"
      openDelay={400}
    >
      <ChakraLink
        as={Link}
        href={href}
        color="pm.primarySoft"
        fontWeight="semibold"
        borderBottomWidth="1px"
        borderColor="pm.primarySoft"
        _hover={{ color: "white", borderColor: "white" }}
      >
        {label}
      </ChakraLink>
    </Tooltip>
  );
}

export function LessonBody({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "list") {
          return (
            <UnorderedList key={i} spacing={2} color="pm.text" pl={1} mt={4}>
              {block.items.map((item) => (
                <ListItem key={item} lineHeight="tall">
                  {item}
                </ListItem>
              ))}
            </UnorderedList>
          );
        }

        return (
          <Text key={i} color="pm.text" lineHeight="tall" mt={i === 0 ? 0 : 4}>
            {block.segments.map((seg, j) => {
              if (seg.kind === "text") {
                return <span key={j}>{seg.value}</span>;
              }
              return <TermHint key={j} termId={seg.termId} label={seg.label} />;
            })}
          </Text>
        );
      })}
    </>
  );
}
