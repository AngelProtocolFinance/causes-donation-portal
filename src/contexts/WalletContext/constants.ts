import { ProviderId } from "./types";
import binanceWalletIcon from "assets/icons/wallets/binance.png";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import terraStationIcon from "assets/icons/wallets/terra-extension.jpg";
import walletConnectIcon from "assets/icons/wallets/wallet-connect.png";
import xdefiIcon from "assets/icons/wallets/xdefi.jpg";

export const providerIcons: { [key in ProviderId]: string } = {
  "binance-wallet": binanceWalletIcon,
  metamask: metamaskIcon,
  "xdefi-wallet": xdefiIcon,
  "xdefi-evm": xdefiIcon,
  station: terraStationIcon,
  walletconnect: walletConnectIcon,
};

export const chains = {
  1: { name: "Ethereum mainnet", rpc: "", lcd: "", txExplorer: "" },
  2: { name: "Ethereum mainnet", rpc: "", lcd: "", txExplorer: "" },
  3: { name: "Ethereum mainnet", rpc: "", lcd: "", txExplorer: "" },
  4: { name: "Ethereum mainnet", rpc: "", lcd: "", txExplorer: "" },
};
