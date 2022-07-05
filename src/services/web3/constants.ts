import { AltToken, Denoms, EVMNative, TerraNative, WithBalance } from "types";
import lunaLogo from "assets/icons/currencies/luna.png";
import { bnbChainId, ethChainId, terraChainId } from "constants/chainIDs";
import {
  binanceBlockExplorer,
  binanceRpcUrl,
  ethereumBlockExplorer,
  ethereumRpcUrl,
} from "constants/urls";
import { IS_TEST } from "constants/env";

const usdcLogoUrl = "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=022";

export const bnbToken: EVMNative = {
  type: "evm-native",
  denom: Denoms.BNB,
  symbol: "BNB",
  logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=022",
  decimals: 18,
  chain_id: bnbChainId,
  rpc_url: binanceRpcUrl,
  chain_name: getChainName("Binance"),
  block_explorer_url: binanceBlockExplorer,
  tokens: [],
};

export const busdToken: AltToken = {
  type: "bep20",
  denom: Denoms.BUSD,
  symbol: "BUSD (Binance)",
  logo: "https://cryptologos.cc/logos/binance-usd-busd-logo.svg?v=022",
  decimals: 18,
  chain_id: bnbChainId,
  rpc_url: binanceRpcUrl,
  contract_addr: IS_TEST
    ? "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee"
    : "0xe9e7cea3dedca5984780bafc599bd69add087d56",
  chain_name: getChainName("Binance"),
};

export const ethToken: EVMNative = {
  type: "evm-native",
  denom: Denoms.ETH,
  symbol: "ETH",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022",
  decimals: 18,
  chain_id: ethChainId,
  rpc_url: ethereumRpcUrl,
  chain_name: getChainName("Ethereum"),
  block_explorer_url: ethereumBlockExplorer,
  tokens: [],
};

export const ethUSDCToken: AltToken = {
  type: "erc20",
  denom: Denoms.ethUSDC,
  symbol: "USDC (Ethereum)",
  logo: usdcLogoUrl,
  decimals: 6,
  chain_id: ethChainId,
  rpc_url: ethereumRpcUrl,
  contract_addr: IS_TEST
    ? "0xdCFaB8057d08634279f8201b55d311c2a67897D2"
    : "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  chain_name: getChainName("Ethereum"),
};

export const ethUSDTToken: AltToken = {
  type: "erc20",
  denom: Denoms.ethUSDT,
  symbol: "USDT (Ethereum)",
  logo: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022",
  decimals: 6,
  chain_id: ethChainId,
  rpc_url: ethereumRpcUrl,
  contract_addr: IS_TEST
    ? "0xf3e0d7bF58c5d455D31ef1c2d5375904dF525105"
    : "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  chain_name: getChainName("Ethereum"),
};

export const lunaToken: TerraNative = {
  type: "terra-native",
  denom: Denoms.LUNA,
  symbol: "LUNA",
  logo: lunaLogo,
  decimals: 6,
  chain_id: terraChainId,
  chain_name: getChainName("Terra"),
};

export const axlUSDCToken: TerraNative = {
  type: "terra-native",
  denom: Denoms.axlUSDC,
  symbol: "axlUSDC  (Terra)",
  logo: usdcLogoUrl,
  decimals: 6,
  chain_id: terraChainId,
  chain_name: getChainName("Terra"),
};

export const ethBal: WithBalance = { ...ethToken, balance: 0 };
export const ethUsdcBal: WithBalance = { ...ethUSDCToken, balance: 0 };
export const ethUsdtBal: WithBalance = { ...ethUSDTToken, balance: 0 };
export const bnbBal: WithBalance = { ...bnbToken, balance: 0 };
export const busdBal: WithBalance = { ...busdToken, balance: 0 };
export const lunaBal: WithBalance = { ...lunaToken, balance: 0 };
export const axlUsdcBal: WithBalance = { ...axlUSDCToken, balance: 0 };

export const placeHolderBalances = [
  bnbBal,
  busdBal,
  ethBal,
  ethUsdcBal,
  ethUsdtBal,
  lunaBal,
  axlUsdcBal,
];

function getChainName(baseName: string) {
  return `${baseName} ${IS_TEST ? "Testnet" : "Mainnet"}`;
}
