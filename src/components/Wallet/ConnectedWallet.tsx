import { Popover } from "@headlessui/react";
import { sliced } from "helpers/sliceAddress";
import {
  useGetWallet,
  useSetWallet,
} from "contexts/WalletContext/WalletContext";
import { WithBalance } from "types";
import { supportedChainIds } from "constants/chainIDs";
import SupportedNetworksMenu from "./SupportedNetworksMenu";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ConnectedWallet = () => {
  const { wallet, isWalletLoading } = useGetWallet();
  const { disconnect } = useSetWallet();

  const { address, displayCoin, coins, chainId } = wallet!; //this component only renders when wallet is connected

  if (!supportedChainIds.includes(chainId)) {
    return <SupportedNetworksMenu />;
  }

  return (
    <Popover className="isolate relative">
      <Popover.Button
        disabled={isWalletLoading}
        className="btn-orange text-sm py-2 px-3 rounded-md flex items-center gap-2"
      >
        <span>{sliced(address, 5, -3)}</span>
        {isWalletLoading ? (
          <AiOutlineLoading3Quarters size={15} className="animate-spin" />
        ) : (
          <>
            <span className="hidden sm:block">
              {"| "}
              {displayCoin.balance.toFixed(3)}
            </span>
            <span className="hidden sm:block"> {displayCoin.symbol}</span>
          </>
        )}
      </Popover.Button>

      <Popover.Panel className="absolute border right-0 z-20 px-3 py-2 border-prim bg-white dark:bg-blue-d7 w-full min-w-max mt-2 rounded-md shadow-lg">
        <p className="mb-2 uppercase font-extrabold text-sky-600">
          {displayCoin.chain_name}
        </p>
        <p className="text-sm uppercase border-b border-slate-600/2 mb-2 pb-1">
          Balances
        </p>
        <div className="grid gap-1 mb-4">
          {coins.map((coin) => (
            <Token key={coin.denom} {...coin} />
          ))}
        </div>
        <button
          className="uppercase text-sm font-extrabold hover:text-orange dark:hover:text-orange-l2 text-right w-full"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </Popover.Panel>
    </Popover>
  );
};

export default ConnectedWallet;

const Token = (token: WithBalance) => {
  return (
    <div className="flex items-center gap-2 justify-between p-0.5">
      <img src={token.logo} className="w-4 h-4 object-contain" />
      <span>{token.balance.toFixed(3)}</span>
      <span className="ml-auto text-sm">{token.symbol}</span>
    </div>
  );
};
