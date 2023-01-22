import React, { useState } from "react";
import {
  Flex,
  Heading,
  Button,
  Input,
  Text,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { utils } from "ethers";
import { verifyMessage, VerifyResponse } from "@/utils/verify-message";
import { VerifyFeedback } from "./VerifyFeedack";

interface Props {
  formBackground: string;
  theme: string | null;
}

export const VerifyTab: React.FC<Props> = ({
  formBackground,
  theme,
}: Props) => {
  const [verifyResponse, setVerifyResponse] = useState<VerifyResponse>({
    valid: false,
    error: false,
  });

  const onSubmit = async (values: any) => {
    if (errors.signerAddress || errors.message) return;
    const response = await verifyMessage(
      values.signerAddress,
      utils.hashMessage(values.message),
      "0x" // Contracts cannot "sign" natively (contrarily to EOAs).
    );
    setVerifyResponse(response);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        direction="column"
        background={formBackground}
        p={12}
        rounded={6}
        height="70%"
      >
        <FormControl isInvalid={!!errors.signerAddress || !!errors.message}>
          <VerifyFeedback verifyResponse={verifyResponse} />
          <Heading mb={6}>
            Verify an {""}
            <Link
              href="https://eips.ethereum.org/EIPS/eip-1271"
              color={theme === "dark" ? "purple.100" : "purple.300"}
              isExternal
            >
              EIP-1271 <ExternalLinkIcon mx="1px" />
            </Link>
            {""} signature
          </Heading>
          <FormLabel htmlFor="signerAddress">
            The signer address, i.e. a contract implementing EIP-1271
          </FormLabel>
          <Input
            placeholder="0x..."
            variant="filled"
            mb={3}
            type="text"
            id="signerAddress"
            {...register("signerAddress", {
              required: "The should be a valid address",
              validate: (signerAddress) => utils.isAddress(signerAddress),
            })}
          />
          <FormErrorMessage>
            <Text mb={3}>{errors?.signerAddress ? "Invalid address" : ""}</Text>
          </FormErrorMessage>
          <FormLabel htmlFor="message">The message to verify</FormLabel>
          <Textarea
            placeholder="Message to verify"
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
          colorScheme="teal"
          isLoading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          borderRadius={42}
          height={30}
          isDisabled={!!errors.signerAddress || !!errors.message}
        >
          Verify
        </Button>
      </Flex>
    </form>
  );
};
