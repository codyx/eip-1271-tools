import React from "react";
import WalletConnectProvider from "@walletconnect/web3-provider/dist/umd/index.min.js";
import { useEthers } from "@usedapp/core";
import {
  Box,
  Button,
  Flex,
  useBreakpointValue,
  useColorModeValue,
  Text,
  Stack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";

interface Props {
  toggleTheme: () => void;
  theme: string | null;
}

export const NavBar: React.FC<Props> = ({ toggleTheme, theme }: Props) => {
  const { account, activate, deactivate, chainId } = useEthers();

  // if (!config.readOnlyUrls[chainId]) {
  //   return <p>Please use either Mainnet or Goerli testnet.</p>;
  // }

  async function onConnect() {
    try {
      const provider = new WalletConnectProvider({
        infuraId: "d8df2cb7844e4a54ab0a782f608749dd",
      });
      await provider.enable();
      await activate(provider);
    } catch (error) {
      console.error(error);
    }
  }

  const ConnectButton = () => (
    <Button onClick={onConnect} colorScheme="teal" isActive>
      Connect Wallet
    </Button>
  );

  const viewOnEtherscan = () => {
    if (typeof window === undefined || !account) return;
    window.open(
      `https://etherscan.io/address/${account}`,
      "_blank",
      "noreferrer"
    );
  };

  const WalletConnectConnect = () => (
    <Stack direction={"row"} spacing={4}>
      <Button onClick={toggleTheme} colorScheme="facebook">
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>
      {account ? (
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            leftIcon={<ExternalLinkIcon onClick={viewOnEtherscan} />}
          >
            {`0x${account.slice(2, 6).toUpperCase()}...${account
              .slice(-4)
              .toUpperCase()}`}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={deactivate}>Disconnect</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <ConnectButton />
      )}
    </Stack>
  );

  return (
    <Box bg={useColorModeValue("gray.100", "gray.700")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Text
          textAlign={useBreakpointValue({ base: "center", md: "left" })}
          fontFamily={"heading"}
          color={useColorModeValue("gray.800", "white")}
        >
          EIP-1271 Tools
        </Text>
        <WalletConnectConnect />
      </Flex>
    </Box>
  );
};
