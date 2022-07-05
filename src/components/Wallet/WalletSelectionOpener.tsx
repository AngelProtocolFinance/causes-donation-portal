import { useState } from "react";
import WalletSelection from "./WalletSelection";
import { AiOutlineWallet } from "react-icons/ai";

const WalletSelectionOpener = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="sm:bg-slate-50 p-0 sm:py-2 sm:px-3 rounded"
        onClick={() => setOpen(true)}
      >
        <AiOutlineWallet
          size={35}
          className="sm:hidden text-slate-50 hover:text-sky-400 active:text-sky-500"
        />
        <span className="hidden sm:block">Connect Wallet</span>
      </button>

      <WalletSelection setIsSelectionOpen={setOpen} isSelectionOpen={open} />
    </>
  );
};

export default WalletSelectionOpener;
