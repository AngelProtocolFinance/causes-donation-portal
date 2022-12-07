import WalletInstructionModal from "components/WalletInstructionModal";
import { ChangeEvent, useEffect, useState } from "react";
import { WithBalance } from "types";
import useDonate from "./useDonate";
import TxModal from "components/TxModal/TxModal";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { placeHolderBalances } from "services/web3/constants";
import toCurrency from "helpers/toCurrency";
import WalletSelection from "components/Wallet/WalletSelection";
import CurrencyDropdown from "./CurrencyDropdown";
import { FaInfoCircle } from "react-icons/fa";

const DonateForm = (): JSX.Element => {
  const { wallet } = useGetWallet();
  const tokens = wallet?.coins || placeHolderBalances;

  //modal states
  const [isWalletTutorialOpen, setIsWalletTutorialOpen] =
    useState<boolean>(false);
  const [isWalletSelectionOpen, setIsWalletSelectionOpen] =
    useState<boolean>(false);

  //transaction states
  const [activeToken, setActiveToken] = useState<WithBalance>(tokens[0]);
  const [amount, setAmount] = useState<string>("");
  const {
    donate,
    resetTx,
    isWalletConnected,
    txStep,
    txHash,
    isDonateDisabled,
    donateText,
  } = useDonate(amount, activeToken);

  const donateOrConnect = () =>
    isWalletConnected ? donate() : setIsWalletSelectionOpen(true);

  function setMaxAmount() {
    setAmount(toCurrency(activeToken.balance, 3));
  }

  useEffect(() => {
    if (wallet) {
      setActiveToken(wallet.coins[0]);
    }
  }, [wallet]);

  return (
    <>
      <WalletInstructionModal
        open={isWalletTutorialOpen}
        setOpen={setIsWalletTutorialOpen}
      />

      <TxModal step={txStep} txHash={txHash} resetTx={resetTx} />

      <div
        className="grid justify-items-left border border-prim bg-white dark:bg-blue-d6 rounded-md p-4"
        id="donate_now"
      >
        <p className="">Supported Wallets: MetaMask, Binance Wallet, xDefi</p>
        <button
          className="text-left text-sm text-gray-d1 dark:text-gray justify-self-start hover:text-orange hover:dark:text-orange-l2"
          onClick={() => setIsWalletTutorialOpen(true)}
        >
          <FaInfoCircle className="inline relative bottom-px mr-1" />
          Wallet Instructions
        </button>
        <p className="font-heading text-lg md:text-xl uppercase font-extrabold mt-6 mb-2">
          Currency
        </p>
        <CurrencyDropdown
          tokens={tokens}
          activeToken={activeToken}
          setActiveToken={setActiveToken}
        />
        <label
          htmlFor="__donate_amount"
          className="flex justify-between items-baseline mt-6 mb-2"
        >
          <span className="font-heading text-lg md:text-xl font-extrabold uppercase">
            Amount
          </span>
          <div className="text-sm flex gap-1 items-baseline">
            <span className="uppercase text-xs">balance: </span>
            <button
              onClick={setMaxAmount}
              className="hover:text-blue active:text-blue-d1"
            >
              {toCurrency(activeToken.balance || 0, 4)}
            </button>
          </div>
        </label>
        <input
          id="__donate_amount"
          type="text"
          placeholder="0.0000"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.value)
          }
          value={amount}
          className="w-full text-left mb-4 p-3 focus:outline-none border border-prim rounded focus:border-gray-d2 focus:dark:border-blue bg-orange-l6 dark:bg-blue-d7"
        />

        <button
          disabled={isDonateDisabled}
          className="justify-self-end btn-orange py-2 w-full uppercase leading-relaxed font-extrabold rounded"
          onClick={() => donateOrConnect()}
        >
          {donateText}
        </button>
        {isWalletConnected && (
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
        )}
      </div>
    </>
  );
};

export default DonateForm;
