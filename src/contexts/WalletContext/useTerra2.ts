import {
  ConnectType,
  Installation,
  Connection as TerraConnection,
  WalletStatus,
  useWallet,
} from "@terra-money/wallet-provider";
import { ProviderId, Wallet } from "./types";

export default function useTerra2(): Wallet[] {
  const {
    availableConnections,
    availableInstallations,
    network,
    wallets,
    status,
    connect,
    disconnect,
  } = useWallet();

  function toWallet(c: Installation | TerraConnection): Wallet {
    return {
      id: (c?.identifier as ProviderId) || c.type.toLowerCase(),
      type: "terra",
      logo: c.icon,
      name: c.name,
      ...(status === WalletStatus.INITIALIZING
        ? { status: "loading" }
        : WalletStatus.WALLET_CONNECTED && wallets[0]
        ? {
            status: "connected",
            disconnect,
            address: wallets[0].terraAddress,
            chainId: network.chainID,
          }
        : {
            status: "disconnected",
            connect: () => {
              /** if installation */
              if ("url" in c) {
                window.open(c.url, "_blank", "noopener noreferrer");
              } else {
                connect(c.type, c.identifier);
              }
            },
          }),
    };
  }

  return availableConnections
    .filter(_filter)
    .map((c) => toWallet(c))
    .concat(availableInstallations.filter(_filter).map((i) => toWallet(i)));
}

function _filter<T extends TerraConnection | Installation>(conn: T) {
  const id = conn.identifier;
  return (
    id === "xdefi-wallet" ||
    id === "leap-wallet" ||
    id === "station" ||
    conn.type === ConnectType.WALLETCONNECT
  );
}
