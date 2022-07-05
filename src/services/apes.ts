import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apes_endpoint } from "constants/urls";
import { createAuthToken } from "functions/createAuthToken";

type DonationMetrics = {
  largestDonationUsd: string; //"5.02134105";
  numberOfDonations: string; //"4";
  totalUsd: string; //"7.3177838494";
};

export const apesApi = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: apes_endpoint,
    mode: "cors",
    prepareHeaders(headers) {
      headers.set("authorization", createAuthToken());
      return headers;
    },
  }),
  endpoints: (builder) => ({
    metrics: builder.query<DonationMetrics, any>({
      query: () => {
        return {
          url: "/donations-metrics",
          params: { app: "make-whole" },
        };
      },
    }),
  }),
});

export const { useMetricsQuery } = apesApi;
