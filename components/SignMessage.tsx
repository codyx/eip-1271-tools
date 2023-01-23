import React, { useState } from "react";
import { useEthers } from "@usedapp/core";
import {
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Button,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { VerifyFeedback } from "./VerifyFeedack";
import { VerifyResponse } from "@/utils/verify-message";
import WalletConnectProvider from "@walletconnect/web3-provider";

interface Props {
  formBackground: string;
  theme: string | null;
}

export const SignMessage: React.FC<Props> = ({ formBackground }) => {
  const { account } = useEthers();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [verifyResponse, setVerifyResponse] = useState<VerifyResponse>({
    valid: false,
    error: false,
  });

  const onSubmit = async (values: any) => {
    if (!values.message || !account) return;
    try {
      const WCPProvider = new WalletConnectProvider({
        infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
      });
      const sig = await WCPProvider.send("personal_sign", [
        values.message,
        account.toLowerCase(),
      ]);
      setVerifyResponse({
        valid: sig === "0x",
        message: sig === "0x" ? "Successfully signed" : "Unexpected signature",
        error: sig === "0x",
      });
    } catch (err: any) {
      console.error(err);
      setVerifyResponse({
        valid: false,
        message: err?.message || err?.reason || "An error occured",
        error: true,
      });
    }
  };

  return account ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <VerifyFeedback verifyResponse={verifyResponse} />
        <FormControl isInvalid={!!errors.message}>
          <FormLabel htmlFor="message">The message to sign</FormLabel>
          <Textarea
            autoFocus
            placeholder="Message to sign"
            variant="filled"
            mb={3}
            id="message"
            {...register("message", {
              required: "The message cannot be empty",
            })}
          />
          <FormErrorMessage>
            <Text mb={3}>
              {errors?.message ? "The message cannot be empty" : ""}
            </Text>
          </FormErrorMessage>
        </FormControl>
        <Button
          size="lg"
          colorScheme="teal"
          isLoading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          borderRadius={42}
          height={30}
          isDisabled={!!errors.message}
        >
          Sign
        </Button>
      </Flex>
    </form>
  ) : (
    <Text mt={6}>
      Connect a wallet contract (e.g., a multisig) via WalletConnect to sign a
      message
    </Text>
  );
};
