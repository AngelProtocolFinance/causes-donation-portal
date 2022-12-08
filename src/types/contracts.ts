export interface QueryRes<T> {
  data: T;
}

export interface ERC20Token {
  contractAddress: string;
  decimals: number;
  symbol: string;
  name: string;
  balance: string;
}

export type CW20Balance = {
  balance: string;
};
