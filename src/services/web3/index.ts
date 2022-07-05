import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supportedChainIds } from "constants/chainIDs";
import { terraLcdUrl } from "constants/urls";
import { ProviderInfo } from "contexts/WalletContext/types";
import { ethers, utils } from "ethers";
import { CoinData, Denoms, WithBalance } from "types";
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
import { condenseAmount } from "functions/third-party/terra";

type BalanceRes = { balance: CoinData };

export const web3Api = createApi({
  reducerPath: "web3",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    mode: "cors",
  }),
  endpoints: (builder) => ({
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

export const { useBalancesQuery } = web3Api;

function getTerraBalanceQueryUrl(denom: string, address: string) {
  return (
    terraLcdUrl +
    `/cosmos/bank/v1beta1/balances/${address}/by_denom?denom=${denom}`
  );
}
