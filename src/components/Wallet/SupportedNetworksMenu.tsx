import { Popover } from "@headlessui/react";
import { useSetWallet } from "contexts/WalletContext/WalletContext";
import { AiFillWarning } from "react-icons/ai";

export default function SupportedNetworksMenu() {
  const { disconnect } = useSetWallet();

  return (
    <Popover className="relative">
      <Popover.Button className="text-sm font-mono bg-slate-50 py-2 px-3 rounded flex gap-2 items-center text-rose-400">
        <AiFillWarning size={20} />
        <span>unsupported network</span>
      </Popover.Button>

      <Popover.Panel className="absolute z-10 w-full bg-slate-50 mt-2 rounded px-3 py-2 text-slate-700">
        <p className="text-sm font-bold text-sky-500 uppercase">
          Supported networks
        </p>
        <ul className="list-disc my-4 pl-4">
          <li className="text-sm p-0.5">Terra Phoenix Mainnet</li>
          <li className="text-sm p-0.5">Binance Smart Chain</li>
          <li className="text-sm p-0.5">Ethereum Mainnet</li>
        </ul>
        <button
          className="uppercase text-sm font-extrabold text-amber-500 hover:text-amber-400 active:text-amber-600 text-right w-full"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </Popover.Panel>
    </Popover>
  );
}
