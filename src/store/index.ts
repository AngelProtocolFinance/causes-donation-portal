import { configureStore } from "@reduxjs/toolkit";
import { apesApi } from "services/apes";
import { web3Api } from "services/web3";

export const store = configureStore({
  reducer: {
    [web3Api.reducerPath]: web3Api.reducer,
    [apesApi.reducerPath]: apesApi.reducer,

    //auth: authReducer,
    //future: futureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([web3Api.middleware, apesApi.middleware]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
