import { useState } from "react";
import SelectionModal from "./Modal";
import { AiOutlineWallet } from "react-icons/ai";
import { DisconnectedWallet } from "contexts/WalletContext";

export const Opener = ({ wallets }: { wallets: DisconnectedWallet[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="p-0 sm:py-2 sm:px-3 rounded btn-orange uppercase text-sm font-bold"
        onClick={() => setIsOpen(true)}
      >
        <AiOutlineWallet size={35} className="sm:hidden" />
        <span className="hidden sm:block">Connect Wallet</span>
      </button>

      <SelectionModal setIsOpen={setIsOpen} isOpen={isOpen} wallets={wallets} />
    </>
  );
};
