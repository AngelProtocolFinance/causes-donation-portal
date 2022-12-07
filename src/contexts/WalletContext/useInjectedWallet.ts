import { useEffect, useState } from "react";
import { Wallet, WalletMeta, WalletState } from "./types";
import { getProvider } from "helpers/getProvider";
import { EIPMethods } from "constants/ethereum";
import { retrieveUserAction, saveUserAction } from "./helpers/prefActions";
import { AccountChangeHandler, ChainChangeHandler } from "types";

export default function useInjectedWallet(meta: WalletMeta): Wallet {
  const { id } = meta;
  const actionKey = `${id}__pref`;

  const [state, setState] = useState<WalletState>({
    status: "disconnected",
    connect,
  });

  useEffect(() => {
    const lastAction = retrieveUserAction(actionKey);
    const shouldReconnect = lastAction === "connect";
    shouldReconnect && connect(false);
    return () => {
      const provider = getProvider(id);
      if (provider && provider.removeListener) {
        provider.removeListener("accountsChanged", handleAccountsChange);
        provider.removeListener("chainChanged", handleChainChange);
      }
    };
    //eslint-disable-next-line
  }, []);

  const handleChainChange: ChainChangeHandler = (hexChainId) => {
    setState((prev) => {
      if (prev.status === "connected") {
        return {
          ...prev,
          chainId: `${parseInt(hexChainId, 16)}`,
        };
      }
      return prev;
    });
  };

  const handleAccountsChange: AccountChangeHandler = (accounts) => {
    setState((prev) => {
      if (prev.status === "connected" && accounts.length > 0) {
        return {
          ...prev,
          address: accounts[0],
        };
      }
      return prev;
    });
  };

  async function connect(isNew /** new connection */ = true) {
    try {
      const provider = getProvider(id);
      if (!provider) {
        if (!isNew) return; /** dont alert on persistent connection */
        return alert("wallet not installed: show alert with install link");
      }
      /** isMobile check not needed, just hide this wallet on mobile */

      /** xdefi checks */
      type XFIeth = { isMetamask?: boolean };
      if (id === "xdefi-evm" && !(provider as XFIeth).isMetamask) {
        if (!isNew) return;
        return alert("Kindly prioritize Xdefi and reload the page");
      } else if (id !== "xdefi-evm" && (provider as XFIeth).isMetamask) {
        if (!isNew) return;
        return alert("Kindly remove priority to xdefi");
      }

      setState({ status: "loading" });
      /** request access */
      const accounts = await provider.request<string[]>({
        method: EIPMethods.eth_requestAccounts,
      });
      const hexChainId = await provider.request<string>({
        method: EIPMethods.eth_chainId,
      });

      /** attach listeners */
      provider.on("accountsChanged", handleAccountsChange);
      provider.on("chainChanged", handleChainChange);

      setState({
        status: "connected",
        address: accounts[0],
        chainId: `${parseInt(hexChainId, 16)}`,
        disconnect,
      });
      saveUserAction(actionKey, "connect");
    } catch (err) {
      if (isNew) {
        alert("connecting failed");
      }
      setState({ status: "disconnected", connect });
      saveUserAction(actionKey, "disconnect");
    }
  }

  function disconnect() {
    const provider = getProvider(id);
    if (provider) {
      setState({ status: "disconnected", connect });
      saveUserAction(actionKey, "disconnect");

      if (provider.removeListener) {
        provider.removeListener("accountsChanged", handleAccountsChange);
        provider.removeListener("chainChanged", handleChainChange);
      }
    }
  }

  return { ...state, ...meta };
}
