import { Dialog } from "@headlessui/react";
import {
  useSetWallet,
  useGetWallet,
} from "contexts/WalletContext/WalletContext";
import { Connection } from "contexts/WalletContext";
import { WalletError } from "errors";
import { useEffect } from "react";

type Props = {
  isSelectionOpen: boolean;
  setIsSelectionOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const WalletSelection = ({ isSelectionOpen, setIsSelectionOpen }: Props) => {
  const { wallet } = useGetWallet();
  const { connections } = useSetWallet();

  useEffect(() => {
    if (wallet) setIsSelectionOpen(false);
  }, [wallet]);

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
          {connections.map((connection) => (
            <Connector key={connection.name} {...connection} />
          ))}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default WalletSelection;

function Connector(props: Connection) {
  async function handleConnect() {
    try {
      await props.connect();
    } catch (_err: any) {
      let errorMsg: string;
      if (_err instanceof WalletError) {
        errorMsg = _err.message;
      } else {
        errorMsg = "Unknown error occured";
      }
      alert(errorMsg);
    }
  }
  return (
    <button
      className="flex items-center gap-2 p-4 border-b border-gray-d1 dark:border-bluegray hover:text-blue hover:dark:text-orange-l1"
      onClick={handleConnect}
    >
      <img
        className="w-6 h-6 rounded-full object-contain"
        src={props.logo}
        alt=""
      />
      {props.name.toUpperCase()}
    </button>
  );
}
