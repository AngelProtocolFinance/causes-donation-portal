import { useState } from "react";
import SelectionModal from "./Modal";
import { DisconnectedWallet } from "contexts/WalletContext";
import Icon from "components/Icon";

export const Opener = ({ wallets }: { wallets: DisconnectedWallet[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="p-0 sm:py-2 sm:px-3 rounded text-white sm:btn-orange uppercase text-sm font-bold"
        onClick={() => setIsOpen(true)}
      >
        <Icon type="wallet" size={35} className="sm:hidden" />
        <span className="hidden sm:block">Connect Wallet</span>
      </button>

      <SelectionModal setIsOpen={setIsOpen} isOpen={isOpen} wallets={wallets} />
    </>
  );
};
