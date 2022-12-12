import { Popover } from "@headlessui/react";
import { sliced } from "helpers/sliceAddress";
import { Coin } from "types";
import { ConnectedWallet as TConnectedWallet } from "contexts/WalletContext";
import { chains } from "constants/chains";
import SupportedNetworksMenu from "./SupportedNetworksMenu";
import DrawerIcon from "components/DrawerIcon";
import withConnectedWallet, { useConnectedWallet } from "contexts/WalletGuard";
import { Opener } from "./wallet-selection/Opener";
import { useTokensQuery } from "services/apes";
import { useBalanceQuery } from "services/web3";

const Wallet = () => {
  const wallet = useConnectedWallet();
  const chain = chains[wallet.chainId];
  return (
    <Popover className="isolate relative">
      <Popover.Button className="btn-orange text-sm p-2 pr-3 rounded-md flex items-center gap-2">
        {({ open }) => (
          <>
            <img
              src={wallet.logo}
              alt=""
              className="h-6 w-6 bg-white rounded-full p-1"
            />
            <span className="max-sm:hidden">
              {sliced(wallet.address, 5, -3)}
            </span>
            <DrawerIcon isOpen={open} size={22} />
          </>
        )}
      </Popover.Button>

      <Popover.Panel className="absolute border right-0 z-20 px-3 py-2 border-prim bg-white dark:bg-blue-d7 w-full min-w-max mt-2 rounded-md shadow-lg">
        <p className="sm:mb-2 uppercase font-heading text-xs font-bold text-blue-d1">
          {chain.name}
        </p>
        <p className="sm:hidden mb-2 mt-1 text-sm text-right">
          {sliced(wallet.address, 5, -4)}
        </p>
        <p className="text-sm uppercase border-b border-prim mb-2 pb-1">
          Balances
        </p>

        <Balances {...wallet} />
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

function Balances(wallet: TConnectedWallet) {
  const { data: coins = [], isLoading } = useTokensQuery(wallet.chainId);
  if (isLoading) return <p className="text-sm mb-4">Fetching tokens...</p>;
  return (
    <div className="grid gap-1 mb-4 empty:after:content-['wallet_is_empty'] after:text-xs">
      {coins.map((coin) => (
        <Token key={coin.token_id} wallet={wallet} coin={coin} />
      ))}
    </div>
  );
}

const Token = ({ coin, wallet }: { coin: Coin; wallet: TConnectedWallet }) => {
  const { data: balance = 0, isLoading } = useBalanceQuery({
    ...coin,
    address: wallet.address,
    chainId: wallet.chainId,
  });

  if (!balance && !isLoading) return null;

  return (
    <div className="flex items-center gap-2 justify-between p-0.5">
      <img src={coin.logo} className="w-4 h-4 object-contain" />
      <span>{isLoading ? "..." : balance.toFixed(3)}</span>
      <span className="ml-auto text-sm">{coin.symbol}</span>
    </div>
  );
};

export default withConnectedWallet(Wallet, {
  type: "replacement",
  loading: <div className="pr-2 text-white">Loading...</div>,
  disconnected: Opener,
  unsupported: SupportedNetworksMenu,
});
