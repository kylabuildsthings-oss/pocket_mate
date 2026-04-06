import {
  ethers,
  type BrowserProvider,
  type Eip1193Provider,
  type JsonRpcProvider,
} from "ethers";

export const connectedSigner = async (
  provider: BrowserProvider | JsonRpcProvider
) => {
  const signer = await provider.getSigner();
  return signer;
};

export const readOnlyProvider = async () => {
  const alchemyProvider = new ethers.AlchemyProvider(
    "goerli",
    process.env.NEXT_PUBLIC_ALCHEMY_GOERLI
  );
  return alchemyProvider;
};

export const getSigner = async (
  provider?: BrowserProvider | JsonRpcProvider
) => {
  if (!provider) {
    const readOnly = await readOnlyProvider();
    return readOnly;
  }
  const signer = await connectedSigner(provider);
  return signer;
};

/**
 * Resolves the connected EIP-1193 wallet address, or `null` if no extension
 * is present or the user has not authorized an account (e.g. MetaMask missing).
 */
export const getSignerAddress = async (): Promise<string | null> => {
  if (typeof window === "undefined") return null;
  const w = window as Window & { ethereum?: Eip1193Provider };
  const eth = w.ethereum;
  if (!eth) return null;
  try {
    const provider = new ethers.BrowserProvider(eth);
    const signer = await provider.getSigner();
    return await signer.getAddress();
  } catch {
    return null;
  }
};

export const isWalletConnected = async (): Promise<boolean> => {
  const connectedAccount = await getSignerAddress();
  return Boolean(connectedAccount);
};
