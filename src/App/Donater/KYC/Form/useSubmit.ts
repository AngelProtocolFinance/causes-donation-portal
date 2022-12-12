import { FormValues as FV, PrevTx } from "../types";
import { useReceiptMutation } from "services/apes";
import { useModalContext } from "contexts/ModalContext";
import Prompt from "components/Prompt";

export default function useSubmit({ hash }: PrevTx) {
  const [submitRequest] = useReceiptMutation();
  const { showModal } = useModalContext();

  const submit = async (data: FV) => {
    const { name, address, email, city, state, postalCode, country } = data;
    const response = await submitRequest({
      fullName: `${name.first} ${name.last}`,
      email,
      streetAddress: `${address.street} ${address.complement}`,
      city,
      state,
      zipCode: postalCode,
      country: country.name,
      consent_tax: true,
      consent_marketing: true,
      transactionId: hash,
    });

    if ("error" in response) {
      return showModal(Prompt, {
        message: "Failed to send receipt request. Please try again later.",
      });
    }
    showModal(Prompt, {
      message: "Your tax receipt has been sent to the email address provided",
    });
  };

  return submit;
}
