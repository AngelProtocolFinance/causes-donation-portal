import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { app } from "constants/config";
import { IS_TEST } from "constants/env";
import { APIs } from "constants/urls";
import { createAuthToken } from "helpers/createAuthToken";
import { Coin, FetchedChain, ReceiptPayload } from "types";

type DonationMetrics = {
  largestDonationUsd: string; //"5.02134105";
  numberOfDonations: string; //"4";
  totalUsd: string; //"7.3177838494";
};

type TxDefaults = {
  /** defaults */
  transactionDate: string;
  splitLiq: "100"; //default to "100%"
  fundId: number;
  network: "testnet" | "mainnet";
};

type TxDetails = {
  transactionId: string;
  chainId: string;
  amount: number;
  denomination: string;
  walletAddress: string;
};

export const apes = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: APIs.apes,
    mode: "cors",
    prepareHeaders(headers) {
      headers.set("authorization", createAuthToken());
      return headers;
    },
  }),
  endpoints: (builder) => ({
    tokens: builder.query<Coin[], string>({
      query: (chainId) => `v1/chain/${chainId}`,
      transformResponse(res: FetchedChain) {
        return [res.native_currency, ...res.tokens];
      },
    }),
    metrics: builder.query<DonationMetrics, any>({
      query: () => {
        return {
          url: "v1/donations-metrics",
          params: { app: app.id },
        };
      },
    }),
    donationLog: builder.mutation<any, TxDetails>({
      query: (payload) => {
        const defaults: TxDefaults = {
          network: IS_TEST ? "testnet" : "mainnet",
          splitLiq: "100",
          transactionDate: new Date().toISOString(),
          fundId: app.indexFund,
        };
        return {
          method: "POST",
          url: "v2/donation",
          params: { app: app.id },
          body: { ...payload, ...defaults },
        };
      },
    }),
    receipt: builder.mutation<any, ReceiptPayload>({
      query: (receiptPayload) => {
        const { transactionId, ...restOfPayload } = receiptPayload;
        return {
          url: `v2/donation`,
          params: { transactionId },
          method: "PUT",
          body: restOfPayload,
        };
      },
    }),
  }),
});

export const {
  useMetricsQuery,
  useTokensQuery,
  useDonationLogMutation,
  useReceiptMutation,
} = apes;
