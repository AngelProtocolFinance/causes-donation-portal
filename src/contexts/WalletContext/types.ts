export type ProviderId =
  | "binance-wallet"
  | "metamask"
  | "xdefi-wallet" //xdefi terra provider
  | "xdefi-evm" //xdefi evm provider
  | "station"
  | "walletconnect";

export type Connection = {
  logo: string;
  name: string;
  connect(arg?: string): Promise<void>;
};

export type ProviderInfo = {
  providerId: ProviderId;
  logo: string;
  chainId: string;
  address: string;
  type: "evm" | "terra";
};

type ProviderStatus = { providerInfo?: ProviderInfo; isLoading: boolean };
export type ProviderStatuses = ProviderStatus[];
