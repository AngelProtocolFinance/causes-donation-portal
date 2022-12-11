export type Coin = {
  decimals: number; // 6
  logo: string; // "https://cryptologos.cc/sample/only/lunax.png"
  min_donation_amnt: number;
  symbol: string; // DB Partition key ex., "LunaX"
  token_id: string; // "ujuno" | "0xaSD123..." | "ibc/ASH3438hfd..."
  type: "terra-native" | "evm-native" | "erc20" | "cw20" | "ibc";
};

export type FetchedChain = { tokens: Coin[]; native_currency: Coin };
