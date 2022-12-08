import WalletInstruction from "../WalletInstruction";
import { useModalContext } from "contexts/ModalContext";
import { useFormContext } from "react-hook-form";
import { FaInfoCircle } from "react-icons/fa";
import { FormValues as FV } from "../types";
import Amount from "./Amount";
import CoinSelector from "./CoinSelector";
import useDonate from "./useDonate";

export default function Form() {
  const { getValues } = useFormContext<FV>();
  const { showModal } = useModalContext();
  const { submit, isSubmitting } = useDonate();
  return (
    <form
      onSubmit={submit}
      className="grid justify-items-left border border-prim bg-white dark:bg-blue-d6 rounded-md p-4 scroll-mt-24"
      id="donate_now"
    >
      <p className="">Supported Wallets: MetaMask, Binance Wallet, xDefi</p>
      <button
        className="text-left text-sm text-gray-d1 dark:text-gray justify-self-start hover:text-orange hover:dark:text-orange-l2"
        onClick={() => showModal(WalletInstruction, {})}
      >
        <FaInfoCircle className="inline relative bottom-px mr-1" />
        Wallet Instructions
      </button>
      <p className="font-heading text-lg md:text-xl uppercase font-extrabold my-2 mt-4">
        Currency
      </p>
      <CoinSelector<FV, "coin"> fieldName="coin" tokens={getValues("coins")} />
      <Amount />
      <button
        type="submit"
        disabled={isSubmitting}
        className="justify-self-end btn-orange py-2 w-full uppercase leading-relaxed font-extrabold rounded"
      >
        {isSubmitting ? "Processing..." : "Donate"}
      </button>

      <p className="text-sm text-gray-d1 dark:text-gray text-center mt-3">
        If you would prefer to donate through a DAF or other method, please
        reach out to{" "}
        <a
          className="text-blue dark:text-blue-l2"
          href="mailto: support@angelprotocol.io"
        >
          support@angelprotocol.io
        </a>
      </p>
    </form>
  );
}
