"use client";

import { Box, Flex, Heading, Text, Image, Button } from "@chakra-ui/react";
import NextLink from "next/link";

const ComingSoon = () => {
  const Logo = () => {
    return (
      <Flex align="center" ml={5} mt={5}>
        <Image
          src={"/logos/pig_logo.png"}
          alt="Loader"
          width="50"
          height="50"
        />
        <Heading size="lg" ml={5}>
          PocketMate
        </Heading>
      </Flex>
    );
  };

  return (
    <Box h="100vh">
      {Logo()}
      <Flex direction="column" align="center" justify="center" h="90vh">
        <Heading size={"lg"}>Coming soon</Heading>
        <Text my={5} color="gray" fontSize="lg">
          Base app is running — next up: PocketMate shell and Demo/Live mode.
        </Text>
        <Button as={NextLink} href="/dashboard" colorScheme="purple" size="lg">
          Open PocketMate dashboard
        </Button>
      </Flex>
    </Box>
  );
};

export default ComingSoon;
