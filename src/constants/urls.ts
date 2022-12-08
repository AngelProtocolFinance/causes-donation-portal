import { IS_TEST } from "./env";

export const APIs = {
  apes: "https://fctqkloitc.execute-api.us-east-1.amazonaws.com",
};

export const apes_endpoint =
  "https://fctqkloitc.execute-api.us-east-1.amazonaws.com";

/**LCDs & RPCs*/
export const terraLcdUrl = IS_TEST
  ? "https://pisco-lcd.terra.dev"
  : "https://phoenix-lcd.terra.dev";

export const ethereumRpcUrl = IS_TEST
  ? "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
  : "https://rpc.ankr.com/eth";
export const binanceRpcUrl = IS_TEST
  ? "https://data-seed-prebsc-2-s2.binance.org:8545"
  : "https://bsc-dataseed4.defibit.io";

/** block explorer */
export const ethereumBlockExplorer = IS_TEST
  ? "https://kovan.etherscan.io/tx"
  : "https://etherscan.io/tx";

export const binanceBlockExplorer = IS_TEST
  ? "https://testnet.bscscan.com/tx"
  : "https://www.bscscan.com/tx";
