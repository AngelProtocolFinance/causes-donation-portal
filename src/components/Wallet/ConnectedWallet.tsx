import { Popover } from "@headlessui/react";
import { sliced } from "helpers/sliceAddress";
import { WithBalance } from "types";
import { ConnectedWallet as TConnectedWallet } from "contexts/WalletContext";
import { chains } from "constants/chains";
import SupportedNetworksMenu from "./SupportedNetworksMenu";

const ConnectedWallet = ({ wallet }: { wallet: TConnectedWallet }) => {
  if (!(wallet.chainId in chains)) {
    return <SupportedNetworksMenu wallet={wallet} />;
  }

  return (
    <Popover className="isolate relative">
      <Popover.Button
        // disabled={isWalletLoading}
        className="btn-orange text-sm py-2 px-3 rounded-md flex items-center gap-2"
      >
        <span>
          {wallet.chainId} {sliced(wallet.address, 5, -3)}
        </span>
        {/* {isWalletLoading ? (
          <AiOutlineLoading3Quarters size={15} className="animate-spin" />
        ) : (
          <>
            <span className="hidden sm:block">
              {"| "}
              {displayCoin.balance.toFixed(3)}
            </span>
            <span className="hidden sm:block"> {displayCoin.symbol}</span>
          </>
        )} */}
      </Popover.Button>

      <Popover.Panel className="absolute border right-0 z-20 px-3 py-2 border-prim bg-white dark:bg-blue-d7 w-full min-w-max mt-2 rounded-md shadow-lg">
        <p className="mb-2 uppercase font-extrabold text-blue-d1">
          Chain name
          {/* {displayCoin.chain_name} */}
        </p>
        <p className="text-sm uppercase border-b border-prim mb-2 pb-1">
          Balances
        </p>
        {/* <div className="grid gap-1 mb-4">
          {coins.map((coin) => (
            <Token key={coin.denom} {...coin} />
          ))}
        </div> */}
        <button
          className="uppercase text-sm font-extrabold hover:text-orange dark:hover:text-orange-l2 text-right w-full"
          onClick={wallet.disconnect}
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
