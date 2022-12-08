import { IS_TEST } from "./env";

type EVMAsset = { type: "evm"; rpc: string };
type TerraAsset = { type: "terra"; lcd: string };

export type Chain = {
  name: string;
  txExplorer: string;
} & (EVMAsset | TerraAsset);

const infuraId = process.env.REACT_APP_INFURA_ID;

export const chains: { [key: string]: Chain } = IS_TEST
  ? {
      "pisco-1": {
        type: "terra",
        name: "Terra Pisco testnet",
        lcd: "https://pisco-lcd.terra.dev",
        txExplorer: "https://finder.terra.money/testnet/tx/",
      },
      5: {
        type: "evm",
        name: "Ethereum Goerli Testnet",
        rpc: `https://goerli.infura.io/v3/${infuraId}`,
        txExplorer: "https://goerli.etherscan.io/tx/",
      },
      97: {
        type: "evm",
        name: "Binance Testnet",
        rpc: "https://rpc.ankr.com/bsc_testnet_chapel",
        txExplorer: "https://testnet.bscscan.com/tx/",
      },
    }
  : {
      "phoenix-1": {
        type: "terra",
        name: "Terra mainnet",
        lcd: "https://phoenix-lcd.terra.dev",
        txExplorer: "https://finder.terra.money/mainnet/tx/",
      },
      1: {
        type: "evm",
        name: "Ethereum Mainnet",
        rpc: `https://mainnet.infura.io/v3/${infuraId}`,
        txExplorer: "https://etherscan.io/tx/",
      },

      56: {
        type: "evm",
        name: "Binance Mainnet",
        rpc: "https://rpc.ankr.com/bsc",
        txExplorer: "https://bscscan.com/tx/",
      },
    };
