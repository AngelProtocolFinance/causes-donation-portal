import * as Yup from "yup";
import { Coin, CoinWithAmount as CWA, SchemaShape } from "types";
import { FormValues as FV } from "./types";
import { ConnectedWallet } from "contexts/WalletContext";
import { Dec } from "@terra-money/terra.js";

// type Key = keyof CWA;
// type Min = CWA["min_donation_amnt"];
// type Bal = CWA["balance"];
// const minKey: Key = "min_donation_amnt";
// const balKey: Key = "balance";

const coinKey: keyof FV = "coin";

function testPrecision(amount?: number): boolean {
  return new Dec(amount).precision() <= 6;
}
export const tokenConstraint = Yup.number()
  .typeError("invalid: must be a number")
  .positive("invalid: must be greater than zero ")
  .test("max precision", "must not be greater than 6 digits", testPrecision);

export const contextKey = "wallet";
export const schema = Yup.object().shape<SchemaShape<FV>>({
  amount: Yup.lazy((amount: FV["amount"]) =>
    amount === ""
      ? Yup.string().required("required")
      : tokenConstraint.when([coinKey, "$" + contextKey], (...args: any[]) => {
          const [coin, wallet, schema] = args as [
            Coin | undefined,
            ConnectedWallet,
            Yup.NumberSchema
          ];
          if (!coin) return schema;
          const min = coin.min_donation_amnt || Number.NEGATIVE_INFINITY;
          return schema
            .min(min || 0, `amount must be at least ${min}`)
            .test("balance check", "not enough balance", async () => false);
        })
  ),
});
