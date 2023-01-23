import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface Props {
  formBackground: string;
  theme: string | null;
}

export const FAQ: React.FC<Props> = ({ formBackground, theme }) => {
  return (
    <Flex direction="column" background={formBackground} p={12} rounded={6}>
      <Heading>FAQ</Heading>
      <Accordion mt={10} defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {"What's EIP-1271"}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Link
              href="https://eips.ethereum.org/EIPS/eip-1271"
              color={theme === "dark" ? "purple.100" : "purple.300"}
              isExternal
            >
              EIP-1271 <ExternalLinkIcon mx="1px" />
            </Link>
            {
              " is a proposal that aims to standardize the process of verifying signatures when an account is a smart contract, e.g., a multi-sig."
            }
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                What can this tool be used for?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            You can use this DApp tool on desktop and mobile to validate
            signatures from a wallet account that implements WalletConnect and
            EIP-1271.
            <br />
            Also, you can use it to verify whether or not such a wallet account
            signed a specific message.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Which networks are supported?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            For now, only Ethereum Mainnet is supported. This tool has been
            designed to work specifically for{" "}
            <Link
              href="https://safe.global"
              color={theme === "dark" ? "purple.100" : "purple.300"}
              isExternal
            >
              Safe Multi-sigs <ExternalLinkIcon mx="1px" />
            </Link>{" "}
            even though it should also work with others.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                How can I connect my Safe Multisig wallet to this DApp?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Click on Connect Wallet in the navigation bar of this app, copy the
            link and paste it into the Safe WalletConnect app.
            <br />
            Read more about
            <Link
              href="https://help.gnosis-safe.io/en/articles/4356253-walletconnect-safe-app"
              color={theme === "dark" ? "purple.100" : "purple.300"}
              isExternal
            >
              {" "}
              this.
            </Link>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};
