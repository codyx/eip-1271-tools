import React from "react";
import {
  Flex,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import { ValidateTab } from "./ValidateTab";
import { VerifyTab } from "./VerifyTab";
import { useDappConfig } from "@/pages/_app";
import { useEthers } from "@usedapp/core";
import { FAQ } from "./FAQ";

interface Props {
  formBackground: string;
  theme: string | null;
}

export const TabsView: React.FC<Props> = ({ formBackground, theme }: Props) => {
  const { chainId } = useEthers();

  if (chainId && !useDappConfig.readOnlyUrls![chainId!]) {
    return (
      <Text align="center" mt={6}>
        Please use Ethereum Mainnet.
      </Text>
    );
  }
  return (
    <Flex height="100%" alignItems="center" justifyContent="center" mt={3}>
      <Tabs
        width={"100vw"}
        variant="soft-rounded"
        colorScheme="teal"
        align="center"
        defaultIndex={1}
      >
        <TabList>
          <Tab>Validate a message</Tab>
          <Tab>Verify a message</Tab>
          <Tab>FAQ</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ValidateTab formBackground={formBackground} theme={theme} />
          </TabPanel>
          <TabPanel>
            <VerifyTab formBackground={formBackground} theme={theme} />
          </TabPanel>
          <TabPanel>
            <FAQ formBackground={formBackground} theme={theme} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
