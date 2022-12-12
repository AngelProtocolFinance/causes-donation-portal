import * as Yup from "yup";
import { Coin, SchemaShape } from "types";
import { FormValues as FV } from "./types";
import { ConnectedWallet } from "contexts/WalletContext";
import { Dec } from "@terra-money/terra.js";
import { TBalanceFetcher } from "services/web3";

const coinKey: keyof FV = "coin";

function testPrecision(amount?: number): boolean {
  return new Dec(amount).precision() <= 6;
}
export const tokenConstraint = Yup.number()
  .typeError("invalid: must be a number")
  .positive("invalid: must be greater than zero ")
  .test("max precision", "must not be greater than 6 digits", testPrecision);

export const walletContextKey = "wallet";
export const fetcherContextKey = "fetcher";
export const schema = Yup.object().shape<SchemaShape<FV>>({
  amount: Yup.lazy((amount: FV["amount"]) =>
    amount === ""
      ? Yup.string().required("required")
      : tokenConstraint.when(
          [coinKey, "$" + walletContextKey, "$" + fetcherContextKey],
          (...args: any[]) => {
            const [coin, wallet, fetcher, schema] = args as [
              Coin | undefined,
              ConnectedWallet,
              TBalanceFetcher,
              Yup.NumberSchema
            ];
            if (!coin) return schema;
            const min = coin.min_donation_amnt || Number.NEGATIVE_INFINITY;
            return schema
              .min(min || 0, `amount must be at least ${min}`)
              .test("enough balance", "not enough balance", async () => {
                const { data: balance = 0 } = await fetcher(
                  {
                    ...coin,
                    address: wallet.address,
                    chainId: wallet.chainId,
                  },
                  /** this will only fetch once, or may not fetch at all
                   * if other component already queried balance of this particular coin */
                  true
                );
                return balance >= +amount;
              });
          }
        )
  ),
});
