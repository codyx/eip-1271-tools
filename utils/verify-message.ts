import { MainnetProvider } from "@/pages/_app";
import { Contract } from "ethers";

const IERC1271Abi = [
  "function isValidSignature(bytes32 _data, bytes _signature) view returns (bytes4)",
];

// If `isValidSignature` returns this, message has been signed.
const UPDATED_MAGIC = "0x1626ba7e";

export type VerifyResponse = {
  valid: boolean;
  error: boolean;
  message?: string;
};

export const verifyMessage = async (
  contractAddress: string,
  data: string,
  signature: string
): Promise<VerifyResponse> => {
  try {
    const contractWallet = new Contract(
      contractAddress,
      IERC1271Abi,
      MainnetProvider
    );
    const result = await contractWallet.isValidSignature(data, signature);
    return {
      valid: result === UPDATED_MAGIC,
      error: false,
      message:
        result === UPDATED_MAGIC
          ? "Message has been signed"
          : "Message has NOT been signed",
    };
  } catch (err: any) {
    console.error(err.reason);
    return {
      valid: false,
      error: err.reason !== "Hash not approved",
      message: err?.reason,
    };
  }
};
