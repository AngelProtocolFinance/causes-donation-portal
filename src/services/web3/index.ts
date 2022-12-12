import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ethers, utils } from "ethers";
import { Coin, CoinData } from "types";
import ERC20Abi from "abi/ERC20.json";
import { EVMContract, JsonRpcProvider } from "types/third-party/ethers";
import { chains } from "constants/chains";
import { queryContract } from "./queryContract";
import { condenseToNum } from "helpers/decimal";

export const web3Api = createApi({
  reducerPath: "web3",
  tagTypes: ["balance"],
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    mode: "cors",
  }),
  endpoints: (builder) => ({
    balance: builder.query<number, Coin & { chainId: string; address: string }>(
      {
        providesTags(result, meta, args) {
          return result !== undefined
            ? [{ type: "balance", id: args.token_id }]
            : [];
        },
        async queryFn({ chainId, address, ...coin }) {
          const chain = chains[chainId];
          switch (coin.type) {
            case "terra-native":
            case "ibc": {
              const { balance } = await fetch(
                `${chain.lcd}/cosmos/bank/v1beta1/balances/${address}/by_denom?denom=${coin.token_id}`
              ).then<{ balance: CoinData }>((res) => {
                if (!res.ok) {
                  throw new Error(`failed to fetch balance ${coin.token_id}`);
                }
                return res.json();
              });

              return { data: condenseToNum(balance.amount, coin.decimals) };
            }
            case "cw20": {
              const { balance } = await queryContract(
                "cw20Balance",
                coin.token_id,
                { addr: address },
                chain.lcd
              );
              return { data: condenseToNum(balance, coin.decimals) };
            }
            case "erc20": {
              const provider = new JsonRpcProvider(chain.rpc);
              const contract = new EVMContract(
                coin.token_id,
                ERC20Abi,
                provider
              );
              const balance = contract.balanceOf(
                address
              ) as Promise<ethers.BigNumber>;
              return { data: +utils.formatUnits(await balance, coin.decimals) };
            }
            default: /** evm native */
              const provider = new JsonRpcProvider(chain.rpc);
              const balance = await provider.getBalance(address);
              return { data: +utils.formatUnits(balance, coin.decimals) };
          }
        },
      }
    ),
  }),
});

export const {
  useBalanceQuery,
  useLazyBalanceQuery,
  util: { invalidateTags: invalidateWeb3Tags },
} = web3Api;

export type TBalanceFetcher = ReturnType<typeof useLazyBalanceQuery>[0];
