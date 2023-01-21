import React from "react";
import Head from "next/head";
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { VerifyTab } from "@/components/VerifyTab";
import { ValidateTab } from "@/components/ValidateTab";

export default function Home() {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>EIP-1271 Signer/Verifier</title>
        <meta
          name="description"
          content="Validate and Verify messages from a contract implementing EIP-1271"
        />
        <meta name="author" content="codyx" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <Tabs
            width={"100vw"}
            variant="enclosed"
            colorScheme="teal"
            align="center"
            defaultIndex={1}
          >
            <TabList>
              <Tab>Validate a message</Tab>
              <Tab>Verify a message</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ValidateTab
                  formBackground={formBackground}
                  toggleTheme={toggleColorMode}
                  theme={colorMode}
                />
              </TabPanel>
              <TabPanel>
                <VerifyTab
                  formBackground={formBackground}
                  toggleTheme={toggleColorMode}
                  theme={colorMode}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </main>
    </>
  );
}
