import { useEffect, useState } from "react";
import { Wallet, WalletMeta, WalletState } from "./types";
import { getProvider } from "helpers/getProvider";
import { EIPMethods } from "constants/ethereum";
import { retrieveUserAction, saveUserAction } from "./helpers/prefActions";
import { AccountChangeHandler, ChainChangeHandler, Dwindow } from "types";
import { toast } from "react-toastify";

export default function useInjectedWallet(
  meta: WalletMeta & { installUrl: string }
): Wallet {
  const { id } = meta;
  const actionKey = `${id}__pref`;

  const [state, setState] = useState<WalletState>({
    status: "disconnected",
    connect,
  });

  /** persistent connection */
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
      if (prev.status === "connected") {
        if (accounts.length > 0) {
          return {
            ...prev,
            address: accounts[0],
          };
        } else {
          saveUserAction(actionKey, "disconnect");
          return { status: "disconnected", connect };
        }
      }
      return prev;
    });
  };

  async function connect(isNew /** new connection */ = true) {
    try {
      const provider = getProvider(id);
      if (!provider) {
        if (!isNew) return; /** dont alert on persistent connection */
        return window.open(meta.installUrl, "_blank", "noopener noreferrer");
      }
      /** isMobile check not needed, just hide this wallet on mobile */

      /** xdefi checks */
      const xfiEth = (window as Dwindow).xfi?.ethereum;
      if (id === "xdefi-evm" && !xfiEth?.isMetaMask) {
        if (!isNew) return;
        return toast.warn("Kindly prioritize Xdefi and reload the page");
      } else if (id !== "xdefi-evm" && xfiEth?.isMetaMask) {
        if (!isNew) return;
        return toast.warn(
          "Kindly remove priority to Xdefi and reload the page"
        );
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
        toast.error("Failed to connect to wallet.");
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
      } else {
        /** if provider doesn't support removeListener, just reload to remove listeners*/
        window.location.reload();
      }
    }
  }

  return { ...state, ...meta };
}
