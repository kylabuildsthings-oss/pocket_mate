"use client";

import Link from "next/link";
import {
  Center,
  Heading,
  Box,
  Image,
  Container,
  useBreakpointValue,
  VStack,
  Text,
} from "@chakra-ui/react";
import Navbar from "@/components/LandingNavbar";

export default function Community() {
  const isMobileSize = useBreakpointValue({
    base: true,
    sm: false,
    md: false,
    lg: false,
  });

  const projectLink = "https://github.com/kylabuildsthings-oss/pocket_mate";

  return (
    <Box m={5}>
      <Navbar />
      <Center mt={40}>
        <Heading
          size={isMobileSize ? "2xl" : "xl"}
          justifyContent="center"
          textAlign="center"
          mb={5}
          color="#90cdf4"
        >
          PocketMate community
        </Heading>
      </Center>
      <VStack mt={50} spacing={8}>
        <Container maxW="60%" centerContent mb={-90} mt={-58}>
          <Box padding="4" maxW="100%">
            <Image
              boxSize="100%"
              src="/logos/polygon.svg"
              alt="PocketMate community"
              mr={5}
            />
          </Box>
        </Container>
        <VStack spacing={4} mt={20}>
          <Link
            href={projectLink}
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            <Center fontSize={20} color="#90cdf4">
              <Text as="span">Source & issues on GitHub</Text>
            </Center>
          </Link>
          <Text fontSize="sm" color="gray.400" textAlign="center" maxW="md">
            In-app strategy feed and hub: use{" "}
            <Link
              href="/hub"
              style={{ color: "#90cdf4", textDecoration: "underline" }}
            >
              /hub
            </Link>{" "}
            from the PocketMate shell.
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
