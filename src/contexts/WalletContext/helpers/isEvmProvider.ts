import { ProviderId } from "../types";

export default function isEvmProvider(providerId: ProviderId) {
  switch (providerId) {
    //FUTURE: add other leap falcon etc
    case "binance-wallet":
    case "metamask":
    case "xdefi-evm":
      return true;
    default:
      return false;
  }
}
