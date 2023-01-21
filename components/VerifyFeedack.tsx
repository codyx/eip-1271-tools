import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react";
import { VerifyResponse } from "@/utils/verify-message";

interface Props {
  verifyResponse: VerifyResponse;
}

export const VerifyFeedback: React.FC<Props> = (props) => {
  const { valid, error, message } = props.verifyResponse;

  if (!valid && !error && !message) return <></>;

  switch (valid) {
    case true:
      return (
        <Alert status="success" variant="solid" mb={3}>
          <AlertIcon />
          <Box>
            <AlertTitle>Verified</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Box>
        </Alert>
      );
    default:
      return error ? (
        <Alert status="error" variant="solid" mb={3}>
          <AlertIcon />
          <Box>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Box>
        </Alert>
      ) : (
        <Alert status="warning" variant="solid" mb={3}>
          <AlertIcon />
          <Box>
            <AlertTitle>Invalid</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Box>
        </Alert>
      );
  }
};
