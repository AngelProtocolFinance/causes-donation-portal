import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import {
  Connection,
  ProviderId,
  ProviderInfo,
  ProviderStatuses,
} from "./types";
import { WithBalance } from "types";
import { useBalancesQuery } from "services/web3";
import useInjectedProvider from "./useInjectedProvider";
import useTerra from "./useTerra";
import { placeHolderBalances } from "services/web3/constants";

export type WalletState = {
  walletIcon: string;
  displayCoin: WithBalance;
  coins: WithBalance[];
  address: string;
  chainId: string;
  providerId: ProviderId;
  type: ProviderInfo["type"];
};

type State = {
  wallet?: WalletState;
  isWalletLoading: boolean;
  isProviderLoading: boolean;
};

type Setters = {
  disconnect(): void;
  connections: Connection[];
};

const initialState: State = {
  wallet: undefined,
  isWalletLoading: true,
  isProviderLoading: true,
};

export default function WalletContext(props: PropsWithChildren<{}>) {
  // const {
  //   isLoading: isMetamaskLoading, //requesting permission, attaching event listeners
  //   connection: metamaskConnection,
  //   disconnect: disconnectMetamask,
  //   providerInfo: metamaskInfo,
  // } = useInjectedProvider("metamask");

  // const {
  //   isLoading: isBinanceWalletLoading,
  //   connection: binanceWalletConnection,
  //   disconnect: disconnectBinanceWallet,
  //   providerInfo: binanceWalletInfo,
  // } = useInjectedProvider("binance-wallet");

  // const {
  //   isLoading: isXdefiLoading,
  //   connection: xdefiConnection,
  //   disconnect: disconnectXdefi,
  //   providerInfo: xdefiEVMinfo,
  // } = useInjectedProvider("xdefi-evm", undefined, "Xdefi Ethereum");

  const { isTerraLoading, terraConnections, disconnectTerra, terraInfo } =
    useTerra();

  const providerStatuses: ProviderStatuses = [];

  const isProviderLoading = providerStatuses.reduce(
    (status, curr) => status || curr.isLoading,
    false
  );
  const activeProviderInfo = providerStatuses.find(
    ({ providerInfo, isLoading }) => !isLoading && providerInfo !== undefined
  )?.providerInfo;

  const {
    data: coinWithBalances = placeHolderBalances,
    isLoading,
    isFetching,
  } = useBalancesQuery(activeProviderInfo!, { skip: !activeProviderInfo });

  const walletState: WalletState | undefined = useMemo(() => {
    if (activeProviderInfo) {
      const { logo, providerId, address, chainId, type } = activeProviderInfo;
      return {
        walletIcon: logo,
        displayCoin: coinWithBalances[0],
        coins: coinWithBalances,
        address,
        chainId,
        providerId,
        type,
      };
    }
  }, [activeProviderInfo, coinWithBalances]);

  const disconnect = () => {};

  return (
    <getContext.Provider
      value={{
        wallet: walletState,
        isWalletLoading: isFetching || isLoading,
        isProviderLoading,
      }}
    >
      <setContext.Provider
        value={{
          connections: [],
          disconnect,
        }}
      >
        {props.children}
      </setContext.Provider>
    </getContext.Provider>
  );
}

const getContext = createContext<State>(initialState);
const setContext = createContext<Setters>({
  connections: [],
  disconnect: async () => {},
});

export const useSetWallet = () => useContext(setContext);
export const useGetWallet = () => useContext(getContext);
