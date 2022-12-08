import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ethers, utils } from "ethers";
import { Coin, CoinData, CoinWithBalance, FetchedChain } from "types";
import ERC20Abi from "abi/ERC20.json";
import { EVMContract, JsonRpcProvider } from "types/third-party/ethers";
import { Chain } from "constants/chains";
import { queryContract } from "./queryContract";
import { APIs } from "constants/urls";

export const web3Api = createApi({
  reducerPath: "web3",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    mode: "cors",
  }),
  endpoints: (builder) => ({
    balances: builder.query<
      CoinWithBalance[],
      Chain & { id: string; walletAddr: string }
    >({
      providesTags: [],
      async queryFn(args, queryApi, extraOptions, baseQuery) {
        try {
          const { tokens, native_currency } = await fetch(
            `${APIs.apes}/v1/chain/${args.id}`
          ).then<FetchedChain>((res) => {
            if (!res.ok) throw new Error("failed to fetch chain");
            return res.json();
          });

          /**fetch balances for terra  */
          if (args.type === "terra") {
            const { balances: natives } = await fetch(
              args.lcd + `/cosmos/bank/v1beta1/balances/${args.walletAddr}`
            ).then<{ balances: CoinData[] }>((res) =>
              !res.ok ? { balances: [] } : res.json()
            );

            const cw20s = await getCW20Balance(
              args.walletAddr,
              args.lcd,
              tokens
            );

            return {
              data: [native_currency, ...tokens].map((t) => ({
                ...t,
                balance: (() => {
                  const bal =
                    natives.concat(cw20s).find((b) => b.denom === t.token_id)
                      ?.amount || "0";
                  return +utils.formatUnits(bal, t.decimals);
                })(),
              })),
            };
          }

          if (args.type === "evm") {
            const _tokens = [native_currency, ...tokens];
            const balanceQueries = _tokens.map((t) => {
              const jsonProvider = new JsonRpcProvider(args.rpc);
              if (t.type === "erc20") {
                const contract = new EVMContract(
                  t.token_id,
                  ERC20Abi,
                  jsonProvider
                );
                return contract.balanceOf(
                  args.walletAddr
                ) as Promise<ethers.BigNumber>;
              }
              return jsonProvider.getBalance(args.walletAddr);
            });
            const queryResults = await Promise.allSettled(balanceQueries);
            return {
              data: queryResults.map((result, i) => ({
                ..._tokens[i],
                balance:
                  result.status === "fulfilled"
                    ? +utils.formatUnits(result.value, _tokens[i].decimals)
                    : 0,
              })),
            };
          }
          return { data: [] };
        } catch (err) {
          console.log(err);
          return {
            error: {
              status: 500,
              statusText: "Query error",
              data: "Failed to get balances",
            },
          };
        }
      },
    }),
  }),
});

export const { useBalancesQuery } = web3Api;

async function getCW20Balance(
  address: string,
  lcd: string,
  tokens: Coin[]
): Promise<CoinData[]> {
  const cw20BalancePromises = tokens
    .filter((x) => x.type === "cw20")
    .map((x) =>
      queryContract("cw20Balance", x.token_id, { addr: address }, lcd).then(
        (data) => ({
          denom: x.token_id,
          amount: data.balance,
        })
      )
    );
  const cw20Balances = await Promise.all(cw20BalancePromises);
  return cw20Balances;
}
