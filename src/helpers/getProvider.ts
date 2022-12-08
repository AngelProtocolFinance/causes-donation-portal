import { ProviderId } from "contexts/WalletContext";
import { Dwindow, InjectedProvider } from "types";

export function getProvider(
  providerId: ProviderId
): InjectedProvider | undefined {
  const dwindow = window as Dwindow;
  switch (providerId) {
    case "binance-wallet":
      return dwindow.BinanceChain;
    case "metamask":
      return dwindow.ethereum;
    case "xdefi-evm":
      return dwindow.xfi?.ethereum as any;
    default:
      return undefined;
  }
}
