import React from "react";
import {
  Flex,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { ValidateTab } from "./ValidateTab";
import { VerifyTab } from "./VerifyTab";

interface Props {
  formBackground: string;
  theme: string | null;
}

export const TabsView: React.FC<Props> = ({ formBackground, theme }: Props) => {
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
        </TabList>
        <TabPanels>
          <TabPanel>
            <ValidateTab formBackground={formBackground} theme={theme} />
          </TabPanel>
          <TabPanel>
            <VerifyTab formBackground={formBackground} theme={theme} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
