import { IS_TEST } from "./env";

export enum chainIDs {
  //for multi-chain wallets, generalize as either mainnet or testnet only
  terra_test = "pisco-1",
  terra_main = "phoenix-1",
  eth_goerli = "5",
  eth_main = "1",
  bnb_main = "56",
  bnb_test = "97",
}

export const supportedChainIds: string[] = Object.entries(chainIDs).map(
  ([_, val]) => val
);

export const terraChainId = IS_TEST ? chainIDs.terra_test : chainIDs.terra_main;
export const ethChainId = IS_TEST ? chainIDs.eth_goerli : chainIDs.eth_main;
export const bnbChainId = IS_TEST ? chainIDs.bnb_test : chainIDs.bnb_main;
