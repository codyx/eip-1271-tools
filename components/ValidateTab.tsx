import React from "react";
import { Flex, Heading, Button, Text } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

interface Props {
  formBackground: string;
  toggleTheme: () => void;
  theme: string | null;
}

export const ValidateTab: React.FC<Props> = ({
  formBackground,
  toggleTheme,
  theme,
}: Props) => {
  return (
    <Flex
      direction="column"
      background={formBackground}
      p={12}
      rounded={6}
      height={400}
    >
      <Heading mb={6}>Validate an EIP-1271 message</Heading>
      <Text align="center" mb={3}>
        Coming soon...
      </Text>
      <Button onClick={toggleTheme}>
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>
    </Flex>
  );
};
