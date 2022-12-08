import { PropsWithChildren, createContext, useContext } from "react";
import { ConnectedWallet, ContextState, DisconnectedWallet } from "./types";
import binanceWalletIcon from "assets/icons/wallets/binance.png";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import xdefiIcon from "assets/icons/wallets/xdefi.jpg";

import useInjectedWallet from "./useInjectedWallet";
import useTerra from "./useTerra";

export default function WalletContext(props: PropsWithChildren<{}>) {
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
  const xdefiEvm = useInjectedWallet({
    id: "xdefi-evm",
    logo: xdefiIcon,
    type: "evm",
    name: "Xdefi ethereum",
  });
  const terraWallets = useTerra();

  const wallets = [metamask, binance, xdefiEvm, ...terraWallets];

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
