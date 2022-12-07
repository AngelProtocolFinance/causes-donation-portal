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

type Connected = {
  status: "connected";
  address: string;
  chainId: string;
  disconnect(): void;
};
type Disconnected = { status: "disconnected"; connect(args?: any): void };
type Loading = { status: "loading" };

export type WalletState = Connected | Disconnected | Loading;
export type WalletMeta = {
  logo: string;
  type: string;
  id: ProviderId;
  name: string;
};
export type Wallet = WalletMeta & WalletState;

export type ConnectedWallet = WalletMeta & Connected;
export type DisconnectedWallet = WalletMeta & Disconnected;

export type ContextState =
  | "loading" /** consolidate all LoadingWallet*/
  | ConnectedWallet
  | DisconnectedWallet[];
