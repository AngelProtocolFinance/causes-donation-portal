import * as Yup from "yup";
import { CoinWithAmount as CWA, SchemaShape } from "types";
import { FormValues } from "./types";

type Key = keyof CWA;
type Min = CWA["min_donation_amnt"];
type Bal = CWA["balance"];
const minKey: Key = "min_donation_amnt";
const balKey: Key = "balance";

function testTokenDigits(tokenAmount?: number): boolean {
  return !tokenAmount || /^\d+(\.\d{1,6})?$/.test(`${tokenAmount}`);
}
export const tokenConstraint = Yup.number()
  .positive("invalid: must be greater than zero ")
  .typeError("invalid: must be a number")
  .test("max precision", "must not be greater than 6 digits", testTokenDigits);

export const tokenShape: SchemaShape<CWA> = {
  amount: Yup.lazy((amount: string) =>
    amount === ""
      ? Yup.string().required("required")
      : tokenConstraint.when([minKey, balKey], (...args: any[]) => {
          const [minAmount, balance, schema] = args as [Min, Bal, any];
          return !!minAmount
            ? schema
                .min(minAmount || 0, `amount must be at least ${minAmount}`)
                .max(balance, "not enough balance")
            : schema.max(balance, "not enough balance");
        })
  ),
};
export const schema = Yup.object().shape<SchemaShape<FormValues>>({
  coin: Yup.object().shape(tokenShape),
});
