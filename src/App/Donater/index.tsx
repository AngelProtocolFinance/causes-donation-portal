import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import Form from "./Form";
import { walletContextKey, fetcherContextKey, schema } from "./schema";
import withConnectedWallet, { useConnectedWallet } from "contexts/WalletGuard";
import { useLazyBalanceQuery } from "services/web3";

function Donater() {
  const wallet = useConnectedWallet();
  const [fetchBalance] = useLazyBalanceQuery();
  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
    },
    context: { [walletContextKey]: wallet, [fetcherContextKey]: fetchBalance },
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}

export default withConnectedWallet(Donater, {
  type: "overlay",
  classes: {
    overlay:
      "bg-black/50 text-white dark:bg-white/60 dark:text-gray-d2 rounded grid place-items-center z-[1] font-bold font-heading",
  },
  disconnected: <>You need to connect your wallet to make a donation</>,
  loading: <>Connecting wallet..</>,
  unsupported: <>Wallet network is not supported</>,
});
