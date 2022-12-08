import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";

export const queryObject: {
  [K in QT]: Q[K]["args"] extends null
    ? object
    : (args: Q[K]["args"]) => object;
} = {
  /** cw20 */
  cw20Balance({ addr }) {
    return { balance: { address: addr } };
  },
};
