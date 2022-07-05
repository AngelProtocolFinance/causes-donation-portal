import {
  ConnectType,
  WalletStatus,
  useWallet,
} from "@terra-money/wallet-provider";
import { ProviderId, ProviderInfo, Connection } from "./types";

const excludedTerraWallets: string[] = [
  "leap-walelt",
  "falcon-wallet",
  "bitkeep-wallet",
];

export default function useTerra() {
  const {
    availableConnections,
    connection,
    network,
    wallets,
    status,
    connect,
    disconnect,
  } = useWallet();

  const terraInfo: ProviderInfo | undefined = connection
    ? {
        providerId:
          //use connect type as Id if no futher connections stems out of the type
          (connection?.identifier as ProviderId) ||
          connection.type.toLowerCase(),
        logo: connection?.icon!,
        chainId: network.chainID,
        address: wallets[0].terraAddress,
        type: "terra",
      }
    : undefined;

  const terraConnections: Connection[] = availableConnections
    .filter(
      ({ identifier: id = "", type }) =>
        !(excludedTerraWallets.includes(id) || type === ConnectType.READONLY)
    )
    .map((connection) => ({
      logo: connection.icon,
      name:
        connection.identifier === "xdefi-wallet"
          ? "Xdefi (Terra)"
          : connection.name,
      connect: async () => {
        connect(connection.type, connection.identifier);
      },
    }));

  return {
    isTerraLoading: status === WalletStatus.INITIALIZING,
    terraConnections,
    disconnectTerra: disconnect,
    terraInfo,
  };
}

/** | "leap-wallet"
  | "falcon-wallet"
  | "bitkeep-wallet" */
