import { configureStore } from "@reduxjs/toolkit";
import { apes } from "services/apes";
import { web3Api } from "services/web3";

export const store = configureStore({
  reducer: {
    [web3Api.reducerPath]: web3Api.reducer,
    [apes.reducerPath]: apes.reducer,

    //auth: authReducer,
    //future: futureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([web3Api.middleware, apes.middleware]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
