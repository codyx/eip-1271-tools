import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { Mainnet, Config, DAppProvider } from "@usedapp/core";
import { providers } from "ethers";

if (!process.env.NEXT_PUBLIC_MAINNET_PROVIDER)
  throw new Error("NEXT_PUBLIC_MAINNET_PROVIDER env variable is not set");

export const MainnetProvider = new providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_MAINNET_PROVIDER
);

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: process.env.NEXT_PUBLIC_MAINNET_PROVIDER!,
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </DAppProvider>
  );
}
