import { chainIDs } from "constants/chainIDs";

export default function getTxUrl(txhash: string, chainId?: string) {
  switch (chainId) {
    case chainIDs.terra_main:
      return `https://finder.terra.money/mainnet/tx/${txhash}`;
    case chainIDs.terra_test:
      return `https://finder.terra.money/testnet/tx/${txhash}`;
    case chainIDs.eth_kovan:
      return `https://kovan.etherscan.io/tx/${txhash}`;
    case chainIDs.eth_main:
      return `https://etherscan.io/tx/${txhash}`;
    case chainIDs.bnb_test:
      return `https://testnet.bscscan.com/tx/${txhash}`;
    case chainIDs.bnb_main:
      return `https://bscscan.com/tx/${txhash}`;
    default:
      return `https://finder.terra.money`;
  }
}
