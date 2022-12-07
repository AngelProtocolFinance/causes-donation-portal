import { Popover } from "@headlessui/react";
import { useSetWallet } from "contexts/WalletContext/WalletContext";
import { AiFillWarning } from "react-icons/ai";

export default function SupportedNetworksMenu() {
  const { disconnect } = useSetWallet();

  return (
    <Popover className="relative">
      <Popover.Button className="text-sm bg-white py-2 px-3 rounded-md flex gap-2 items-center text-red">
        <AiFillWarning size={20} />
        <span>Unsupported network</span>
      </Popover.Button>

      <Popover.Panel className="absolute z-10 w-full bg-white dark:bg-blue-d7 border border-prim mt-2 rounded-md px-3 py-2">
        <p className="text-sm font-bold text-blue uppercase">
          Supported networks
        </p>
        <ul className="list-disc my-4 pl-4">
          <li className="text-sm p-0.5">Terra Phoenix Mainnet</li>
          <li className="text-sm p-0.5">Binance Smart Chain</li>
          <li className="text-sm p-0.5">Ethereum Mainnet</li>
        </ul>
        <button
          className="uppercase text-sm font-extrabold hover:text-orange hover:dark:text-orange-l2 text-right w-full"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </Popover.Panel>
    </Popover>
  );
}
