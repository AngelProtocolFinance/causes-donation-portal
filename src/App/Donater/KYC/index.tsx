import { Dialog } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues, PrevTx } from "./types";
import { placeHolderCountryOption } from "./CountrySelector";
import Form, { formStyle } from "./Form";
import { schema } from "./schema";

export default function KYC(props: PrevTx) {
  const methods = useForm<FormValues>({
    defaultValues: { country: placeHolderCountryOption },
    resolver: yupResolver(schema),
  });

  return (
    <Dialog.Panel
      className={`${formStyle} fixed-center z-20 rounded-md p-6 w-full max-w-xl max-h-[85vh] overflow-y-auto scroller shadow-lg border-none dark:border-2 dark:border-bluegray`}
    >
      <FormProvider {...methods}>
        <Form {...props} />
      </FormProvider>
    </Dialog.Panel>
  );
}
