import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "../../types";

import Balance from "./Balance";

export default function Amount() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FV>();

  return (
    <div className="grid mt-4 mb-8 relative">
      <div className="flex items-baseline justify-between mb-1">
        <label
          htmlFor="amount"
          className="text-lg font-extrabold font-heading uppercase"
        >
          Amount
        </label>
        <Balance />
      </div>

      <input
        {...register("coin.amount")}
        autoComplete="off"
        id="amount"
        type="text"
        placeholder="0.0000"
        className="p-3 bg-orange-l6 dark:bg-blue-d7 rounded w-full border border-prim focus:outline-none focus:border-gray-d2 focus:dark:border-blue"
      />

      <ErrorMessage
        errors={errors}
        name="coin.amount"
        as="p"
        className="text-red dark:text-red-l2 text-xs text-left my-1 absolute -bottom-6"
      />
    </div>
  );
}
