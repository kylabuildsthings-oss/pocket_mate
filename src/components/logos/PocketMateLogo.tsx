"use client";

import { Flex, Heading, useBreakpointValue, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface PocketMateLogoProps {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
}

const PocketMateLogo = ({ direction = "row" }: PocketMateLogoProps) => {
  const router = useRouter();
  const isMobileSize = useBreakpointValue({
    base: true,
    sm: false,
    md: false,
    lg: false,
  });

  return (
    <Flex
      direction={direction}
      align="center"
      cursor="pointer"
      onClick={() => {
        router.push("/");
      }}
    >
      {!isMobileSize && (
        <Image
          src={"/logos/pig_logo.png"}
          alt="PocketMate"
          width="50"
          height="50"
        />
      )}

      <Heading size="lg" ml={isMobileSize ? 0 : 5}>
        PocketMate
      </Heading>
    </Flex>
  );
};

export default PocketMateLogo;
