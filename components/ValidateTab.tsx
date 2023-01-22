import React from "react";
import { Flex, Heading, Text, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface Props {
  formBackground: string;
  theme: string | null;
}

export const ValidateTab: React.FC<Props> = ({
  formBackground,
  theme,
}: Props) => {
  return (
    <>
      <Flex
        direction="column"
        background={formBackground}
        p={12}
        rounded={6}
        height="70vh"
      >
        <Heading mb={6}>
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
        <Text align="center">Coming soon...</Text>
      </Flex>
    </>
  );
};
