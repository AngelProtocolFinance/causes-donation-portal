import { IS_TEST } from "./env";

export type Chain = {
  type: "evm" | "terra";
  name: string;
  rpc: string;
  lcd: string;
  txExplorer: string;
};

const infuraId = process.env.REACT_APP_INFURA_ID;

export const chains: { [key: string]: Chain } = IS_TEST
  ? {
      "pisco-1": {
        type: "terra",
        name: "Terra Pisco testnet",
        lcd: "https://pisco-lcd.terra.dev",
        rpc: "",
        txExplorer: "https://finder.terra.money/testnet/tx/",
      },
      5: {
        type: "evm",
        name: "Ethereum Goerli Testnet",
        rpc: `https://goerli.infura.io/v3/${infuraId}`,
        lcd: "",
        txExplorer: "https://goerli.etherscan.io/tx/",
      },
      97: {
        type: "evm",
        name: "Binance Testnet",
        rpc: "https://rpc.ankr.com/bsc_testnet_chapel",
        lcd: "",
        txExplorer: "https://testnet.bscscan.com/tx/",
      },
    }
  : {
      "phoenix-1": {
        type: "terra",
        name: "Terra mainnet",
        lcd: "https://phoenix-lcd.terra.dev",
        rpc: "",
        txExplorer: "https://finder.terra.money/mainnet/tx/",
      },
      1: {
        type: "evm",
        name: "Ethereum Mainnet",
        rpc: `https://mainnet.infura.io/v3/${infuraId}`,
        lcd: "",
        txExplorer: "https://etherscan.io/tx/",
      },

      56: {
        type: "evm",
        name: "Binance Mainnet",
        rpc: "https://rpc.ankr.com/bsc",
        lcd: "",
        txExplorer: "https://bscscan.com/tx/",
      },
    };
