import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supportedChainIds } from "constants/chainIDs";
import { apes_endpoint, terraLcdUrl } from "constants/urls";
import { ProviderInfo } from "contexts/WalletContext/types";
import { ethers, utils } from "ethers";
import {
  Coin,
  CoinData,
  CoinWithBalance,
  Denoms,
  FetchedChain,
  WithBalance,
} from "types";
import ERC20Abi from "abi/ERC20.json";
import {
  axlUSDCToken,
  lunaToken,
  bnbToken,
  ethToken,
  ethBal,
  bnbBal,
  lunaBal,
  axlUsdcBal,
  placeHolderBalances,
  ethUSDCToken,
  ethUSDTToken,
  busdToken,
} from "./constants";
import { EVMContract, JsonRpcProvider } from "types/third-party/ethers";
import { condenseAmount } from "helpers/third-party/terra";
import { Chain } from "constants/chains";
import { queryContract } from "./queryContract";

type BalanceRes = { balance: CoinData };

export const web3Api = createApi({
  reducerPath: "web3",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    mode: "cors",
  }),
  endpoints: (builder) => ({
    bals: builder.query<
      CoinWithBalance[],
      Chain & { id: string; walletAddr: string }
    >({
      providesTags: [],
      async queryFn(args, queryApi, extraOptions, baseQuery) {
        try {
          const { tokens, native_currency } = await fetch(
            `${apes_endpoint}/v1/chain/${args.id}`
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
    balances: builder.query<WithBalance[], ProviderInfo /**args type */>({
      providesTags: [],
      //address
      //activeChainId
      async queryFn(args, queryApi, extraOptions, baseQuery) {
        try {
          const { providerId, address, type, chainId } = args;

          /** wallet is unsupported */
          if (!supportedChainIds.includes(chainId)) {
            return { data: placeHolderBalances };
          }

          /**fetch balances for terra  */
          if (type === "terra") {
            const lunaBalRes = await fetch(
              getTerraBalanceQueryUrl(Denoms.LUNA, address)
            );
            const axlUsdcBalRes = await fetch(
              getTerraBalanceQueryUrl(Denoms.axlUSDC, address)
            );

            const { balance: luna }: BalanceRes = await lunaBalRes.json();
            const { balance: usdc }: BalanceRes = await axlUsdcBalRes.json();

            return {
              data: [
                { ...axlUSDCToken, balance: condenseAmount(usdc.amount, 6) },
                { ...lunaToken, balance: condenseAmount(luna.amount, 6) },
                bnbBal,
                ethBal,
              ],
            };
          }

          if (type === "evm") {
            const evmTokenList =
              //first on array shows as display coin
              providerId === "metamask"
                ? [ethToken, ethUSDCToken, ethUSDTToken, bnbToken, busdToken]
                : [bnbToken, busdToken, ethToken, ethUSDCToken, ethUSDTToken];

            const balanceQueries = evmTokenList.map((token) => {
              const jsonProvider = new JsonRpcProvider(token.rpc_url);
              if (token.contract_addr) {
                const contract = new EVMContract(
                  token.contract_addr,
                  ERC20Abi,
                  jsonProvider
                );
                return contract.balanceOf(address) as Promise<ethers.BigNumber>;
              }
              return jsonProvider.getBalance(address);
            });
            const queryResults = await Promise.allSettled(balanceQueries);

            //map native balances with ordering
            const coins: WithBalance[] = queryResults.map((result, i) => ({
              ...evmTokenList[i],
              balance:
                result.status === "fulfilled"
                  ? +utils.formatUnits(result.value, evmTokenList[i].decimals)
                  : 0,
            }));

            return {
              data: [...coins, lunaBal, axlUsdcBal],
            };
          }
          return { data: placeHolderBalances };
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

export const { useBalancesQuery, useBalsQuery } = web3Api;

function getTerraBalanceQueryUrl(denom: string, address: string) {
  return (
    terraLcdUrl +
    `/cosmos/bank/v1beta1/balances/${address}/by_denom?denom=${denom}`
  );
}

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
