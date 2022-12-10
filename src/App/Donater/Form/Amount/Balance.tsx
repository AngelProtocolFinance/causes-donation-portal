import { useFormContext } from "react-hook-form";
import { FormValues } from "../../types";
import { humanize, roundDown } from "helpers/decimal";

export default function Balance() {
  return <></>;
  // const { watch, setValue } = useFormContext<FormValues>();
  // const coin = watch("coin");
  // function setMaxVal() {
  //   setValue("coin.amount", roundDown(+token.balance, 4), {
  //     shouldDirty: true,
  //     shouldValidate: true,
  //   });
  // }
  // return (
  //   <button
  //     type="button"
  //     onClick={setMaxVal}
  //     className="text-right hover:text-blue text-xs"
  //   >
  //     BAL: {humanize(+token.balance, 3)} {token.symbol}
  //   </button>
  // );
}
