import { PropsWithChildren, createContext, useContext } from "react";
import { ConnectedWallet, ContextState, DisconnectedWallet } from "./types";
import binanceWalletIcon from "assets/icons/wallets/binance.png";
import metamaskIcon from "assets/icons/wallets/metamask.png";

import useInjectedWallet from "./useInjectedWallet";
import useTerra2 from "./useTerra2";

export default function WalletCtx(props: PropsWithChildren<{}>) {
  const metamask = useInjectedWallet({
    id: "metamask",
    logo: metamaskIcon,
    type: "evm",
    name: "Metamask",
  });
  const binance = useInjectedWallet({
    id: "binance-wallet",
    logo: binanceWalletIcon,
    type: "evm",
    name: "Binance wallet",
  });
  const terraWallets = useTerra2();

  const wallets = [metamask, binance, ...terraWallets];

  const connectedWallet = wallets.find((w) => w.status === "connected") as
    | ConnectedWallet
    | undefined;

  const isLoading = wallets.some((w) => w.status === "loading");

  return (
    <context.Provider
      value={
        isLoading
          ? "loading"
          : connectedWallet
          ? connectedWallet
          : (wallets as DisconnectedWallet[])
      }
    >
      {props.children}
    </context.Provider>
  );
}

const UNINITIALIZED = "unitialized";
const context = createContext<ContextState>(
  UNINITIALIZED as unknown as ContextState
);

export const useWalletContext = () => {
  const val = useContext(context);
  if ((val as any) === UNINITIALIZED) {
    throw new Error("this hook should only be used inside wallet context");
  }
  return val;
};
