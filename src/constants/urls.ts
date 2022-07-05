import { IS_TEST } from "./env";

export const apes_endpoint =
  "https://9t0u8zpqjk.execute-api.us-east-1.amazonaws.com";

/**LCDs & RPCs*/
export const terraLcdUrl = IS_TEST
  ? "https://pisco-lcd.terra.dev"
  : "https://phoenix-lcd.terra.dev";

export const ethereumRpcUrl = IS_TEST
  ? "https://kovan.infura.io/v3/a2be88395e1b49ecb831d4dfd5fb0f75"
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
