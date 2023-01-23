import React from "react";
import { Flex, Heading, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { SignMessage } from "./SignMessage";

interface Props {
  formBackground: string;
  theme: string;
}

export const ValidateTab: React.FC<Props> = ({ formBackground, theme }) => {
  return (
    <Flex direction="column" background={formBackground} p={12} rounded={6}>
      <Heading>
        Validate an {""}
        <Link
          href="https://eips.ethereum.org/EIPS/eip-1271"
          color={theme === "dark" ? "purple.100" : "purple.300"}
          isExternal
        >
          EIP-1271 <ExternalLinkIcon mx="1px" />
        </Link>
        {""} signature
      </Heading>
      <SignMessage formBackground={formBackground} theme={theme} />
    </Flex>
  );
};
