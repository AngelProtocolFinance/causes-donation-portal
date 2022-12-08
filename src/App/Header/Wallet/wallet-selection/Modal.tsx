import { Dialog } from "@headlessui/react";
import { DisconnectedWallet } from "contexts/WalletContext";

type Props = {
  wallets: DisconnectedWallet[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ isOpen, setIsOpen, wallets }: Props) => {
  return (
    <Dialog className="relative" open={isOpen} onClose={() => setIsOpen(false)}>
      {/**backdrop */}
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

      <Dialog.Panel className="z-20 fixed-center p-8 rounded-md min-w-max bg-white dark:bg-blue-d7 border border-prim">
        <Dialog.Title className="uppercase font-extrabold mb-2">
          Connect to a wallet
        </Dialog.Title>
        <div className="grid divide-y divide-gray-l2 dark:divide-bluegray-d1">
          {wallets.map(({ logo, connect, id, name }) => (
            <button
              key={id}
              className="flex items-center gap-2 p-4  hover:text-blue hover:dark:text-orange-l1"
              onClick={connect}
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

export default Modal;
