type TokenBase = {
  denom: string;
  symbol: string; //LUNA
  logo: string;
  decimals: number; //6
  chain_id: string;
};

type CosmosBase = {
  chain_name: string; //Terra testnet
  rpc_url?: never;
  block_explorer_url?: never; //https://testnet.snowtrace.io
  tokens?: never;

  contract_addr?: never;
};

export type CosmosNative = TokenBase &
  CosmosBase & {
    type: "cosmos-native"; //uluna
    //additional info for adding chain in wallet
  };

export type TerraNative = TokenBase &
  CosmosBase & {
    type: "terra-native"; //uluna
  };

export type AltToken = TokenBase & {
  type: "cw20" | "erc20" | "bep20";

  chain_name: string;
  rpc_url: string;
  block_explorer_url?: never; //https://testnet.snowtrace.io
  tokens?: never;

  //info if token is an ERC20 token
  contract_addr: string;
};

export type EVMNative = TokenBase & {
  type: "evm-native"; //avax

  //additional info for adding chain in wallet
  chain_name: string; //Avalanche
  rpc_url: string;
  block_explorer_url: string; //https://testnet.snowtrace.io
  tokens: {
    contract_addr: string;
    logo: string;
  }[];

  //info if token is an ERC20 token
  contract_addr?: never;
};

export type Token = EVMNative | CosmosNative | TerraNative | AltToken;
export type WithBalance<T = Token> = T & { balance: number };
