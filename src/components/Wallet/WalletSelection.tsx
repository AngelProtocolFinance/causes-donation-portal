import { Dialog } from "@headlessui/react";
import { DisconnectedWallet } from "contexts/WalletContext";

type Props = {
  wallets: DisconnectedWallet[];
  isSelectionOpen: boolean;
  setIsSelectionOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const WalletSelection = ({
  isSelectionOpen,
  setIsSelectionOpen,
  wallets,
}: Props) => {
  console.log(wallets);
  return (
    <Dialog
      className="relative"
      open={isSelectionOpen}
      onClose={() => setIsSelectionOpen(false)}
    >
      {/**backdrop */}
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

      <Dialog.Panel className="z-20 fixed-center p-8 rounded-md min-w-max bg-white dark:bg-blue-d7 border border-prim">
        <Dialog.Title className="uppercase font-extrabold mb-2">
          Connect to a wallet
        </Dialog.Title>
        <div className="grid">
          {wallets.map(({ logo, connect, id, name }) => (
            <button
              key={id}
              className="flex items-center gap-2 p-4 border-b border-gray-d1 dark:border-bluegray hover:text-blue hover:dark:text-orange-l1"
              onClick={() => {
                connect();
              }}
            >
              <img
                className="w-6 h-6 rounded-full object-contain"
                src={logo}
                alt=""
              />
              {name}
            </button>
          ))}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default WalletSelection;
