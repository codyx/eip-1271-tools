import React, { useEffect } from "react";
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

  async function injectWallet() {
    const WCPProvider = new WalletConnectProvider({
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    });
    await WCPProvider.enable();
    await activate(WCPProvider);
  }

  async function onConnect() {
    try {
      await injectWallet();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Try reconnecting automatically.
    if (
      typeof window !== "undefined" &&
      window?.localStorage.hasOwnProperty("walletconnect")
    ) {
      const { connected } = JSON.parse(
        window.localStorage.getItem("walletconnect")!
      );
      if (connected) injectWallet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ConnectButton = () => (
    <Button onClick={onConnect} colorScheme="teal" isActive>
      Connect Wallet
    </Button>
  );

  const onDisconnect = () => {
    if (
      typeof window !== "undefined" &&
      window.localStorage.hasOwnProperty("walletconnect")
    ) {
      window.localStorage.removeItem("walletconnect");
    }
    deactivate();
  };

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
            <MenuItem onClick={onDisconnect}>Disconnect</MenuItem>
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
