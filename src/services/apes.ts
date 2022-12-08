import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_CODE } from "constants/env";
import { APIs } from "constants/urls";
import { createAuthToken } from "helpers/createAuthToken";

type DonationMetrics = {
  largestDonationUsd: string; //"5.02134105";
  numberOfDonations: string; //"4";
  totalUsd: string; //"7.3177838494";
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
    metrics: builder.query<DonationMetrics, any>({
      query: () => {
        return {
          url: "v1/donations-metrics",
          params: { app: APP_CODE },
        };
      },
    }),
  }),
});

export const { useMetricsQuery } = apes;
