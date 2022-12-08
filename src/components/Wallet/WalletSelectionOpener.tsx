import { useState } from "react";
import WalletSelection from "./WalletSelection";
import { AiOutlineWallet } from "react-icons/ai";

const WalletSelectionOpener = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="p-0 sm:py-2 sm:px-3 rounded btn-orange uppercase text-sm font-bold"
        onClick={() => setOpen(true)}
      >
        <AiOutlineWallet size={35} className="sm:hidden" />
        <span className="hidden sm:block">Connect Wallet</span>
      </button>

      <WalletSelection setIsSelectionOpen={setOpen} isSelectionOpen={open} />
    </>
  );
};

export default WalletSelectionOpener;
