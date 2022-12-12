import { useFormContext } from "react-hook-form";
import { FormValues } from "../../types";
import { humanize, roundDown } from "helpers/decimal";
import { useConnectedWallet } from "contexts/WalletGuard";
import { useBalanceQuery } from "services/web3";

export default function Balance() {
  const { watch, setValue } = useFormContext<FormValues>();
  const token = watch("coin");
  const wallet = useConnectedWallet();
  const { data: balance = 0, isLoading } = useBalanceQuery(
    {
      ...token,
      address: wallet.address,
      chainId: wallet.chainId,
    },
    { skip: !token }
  );

  function setMaxVal() {
    setValue("amount", roundDown(balance, 4), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }
  return (
    <button
      type="button"
      onClick={setMaxVal}
      className="text-right hover:text-blue text-xs"
    >
      BAL:{" "}
      {isLoading ? (
        <span className="animate-pulse font-bold text-blue">0.00</span>
      ) : (
        humanize(balance, 3)
      )}{" "}
      {token?.symbol}
    </button>
  );
}
