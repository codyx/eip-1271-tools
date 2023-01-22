import React from "react";
import Head from "next/head";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { NavBar } from "@/components/NavBar";
import { TabsView } from "@/components/TabsView";

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
        <>
          <NavBar toggleTheme={toggleColorMode} theme={colorMode} />
          <TabsView formBackground={formBackground} theme={colorMode} />
        </>
      </main>
    </>
  );
}
