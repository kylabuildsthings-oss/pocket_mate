import type { UseToastOptions } from "@chakra-ui/react";

type TransactionToastArgs = Pick<
  UseToastOptions,
  "title" | "description" | "status"
>;

export const transactionErrors = (e: Error) => {
  console.error("transactionErrors", e.message);

  if (e.message.includes("user rejected")) {
    return {
      title: "Transaction Error",
      description: "User rejected transaction",
      status: "error",
    } as TransactionToastArgs;
  }

  if (e.message.includes("User denied transaction signature")) {
    return {
      title: "Transaction Error",
      description: "User rejected transaction",
      status: "error",
    } as TransactionToastArgs;
  }

  return {
    title: "Error",
    description: "Network error",
    status: "error",
  } as TransactionToastArgs;
};
