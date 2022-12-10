import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import Form from "./Form";
import { schema } from "./schema";
import withConnectedWallet from "contexts/WalletGuard";

function Donater() {
  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
    },
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
  unsupported: function () {
    return <>Wallet network is not supported</>;
  },
});
