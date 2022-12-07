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
      <WalletSelection
        isSelectionOpen={isWalletSelectionOpen}
        setIsSelectionOpen={setIsWalletSelectionOpen}
      />
      <TxModal step={txStep} txHash={txHash} resetTx={resetTx} />

      <div
        className="grid justify-items-left border border-slate-500/30 rounded-md p-4 text-slate-600"
        id="donate_now"
      >
        <p className="">Supported Wallets: MetaMask, Binance Wallet, xDefi</p>
        <button
          className="text-left text-sm underline text-slate-600/60 justify-self-start"
          onClick={() => setIsWalletTutorialOpen(true)}
        >
          Wallet Instructions
        </button>
        <p className="text-lg md:text-xl uppercase font-extrabold mt-6 mb-2 text-xl">
          Currency
        </p>
        <CurrencyDropdown
          tokens={tokens}
          activeToken={activeToken}
          setActiveToken={setActiveToken}
        />
        <label
          htmlFor="__donate_amount"
          className="flex justify-between items-baseline mt-6"
        >
          <span className="text-lg md:text-xl uppercase font-extrabold uppercase slashed-zero">
            Amount
          </span>
          <div className="text-sm flex gap-1 items-baseline">
            <span className="uppercase text-xs">balance: </span>
            <button
              onClick={setMaxAmount}
              className="hover:text-sky-500 active:text-sky-600"
            >
              {toCurrency(activeToken.balance || 0, 4)}
            </button>
          </div>
        </label>
        <input
          id="__donate_amount"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.value)
          }
          value={amount}
          className="text-2xl w-full text-left pl-2 pb-1 mb-4 focus:outline-none border-b-2 border-slate-500/40 focus:border-sky-500/40"
        />

        <button
          disabled={isDonateDisabled}
          className="self-end bg-sky-500 hover:bg-sky-400 active:bg-sky-600 disabled:bg-slate-300 w-full p-2 uppercase leading-relaxed font-extrabold text-slate-50 rounded"
          onClick={() => donateOrConnect()}
        >
          {donateText}
        </button>
        {isWalletConnected && (
          <p className="text-sm text-zinc-400 text-center mt-3">
            If you would prefer to donate through a DAF or other method, please
            reach out to{" "}
            <a className="text-sky-400" href="mailto: support@angelprotocol.io">
              support@angelprotocol.io
            </a>
          </p>
        )}
      </div>
    </>
  );
};

export default DonateForm;
