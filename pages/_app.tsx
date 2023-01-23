import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { Mainnet, Config, DAppProvider, Goerli } from "@usedapp/core";
import { providers } from "ethers";

if (!process.env.NEXT_PUBLIC_MAINNET_PROVIDER)
  throw new Error("NEXT_PUBLIC_MAINNET_PROVIDER env variable is not set");

if (!process.env.NEXT_PUBLIC_INFURA_ID)
  throw new Error("NEXT_PUBLIC_INFURA_ID env variable is not set");

export const MainnetProvider = new providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_MAINNET_PROVIDER
);

export const useDappConfig: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: MainnetProvider,
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={useDappConfig}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </DAppProvider>
  );
}
