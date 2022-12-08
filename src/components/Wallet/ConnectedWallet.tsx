import { Popover } from "@headlessui/react";
import { sliced } from "helpers/sliceAddress";
import { CoinWithBalance } from "types";
import { ConnectedWallet as TConnectedWallet } from "contexts/WalletContext";
import { Chain, chains } from "constants/chains";
import SupportedNetworksMenu from "./SupportedNetworksMenu";
import { useBalsQuery } from "services/web3";

const ConnectedWallet = ({ wallet }: { wallet: TConnectedWallet }) => {
  if (!(wallet.chainId in chains)) {
    return <SupportedNetworksMenu wallet={wallet} />;
  }

  const chain = chains[wallet.chainId];
  return (
    <Popover className="isolate relative">
      <Popover.Button className="btn-orange text-sm p-2 pr-3 rounded-md flex items-center gap-2">
        <img
          src={wallet.logo}
          alt=""
          className="h-6 w-6 bg-white rounded-full p-1"
        />
        <span>{sliced(wallet.address, 5, -3)}</span>
      </Popover.Button>

      <Popover.Panel className="absolute border right-0 z-20 px-3 py-2 border-prim bg-white dark:bg-blue-d7 w-full min-w-max mt-2 rounded-md shadow-lg">
        <p className="mb-2 uppercase font-extrabold text-blue-d1">
          {chain.name}
        </p>
        <p className="text-sm uppercase border-b border-prim mb-2 pb-1">
          Balances
        </p>
        <Balances wallet={wallet} chain={chain} />
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

const Token = ({ logo, balance, symbol }: CoinWithBalance) => {
  return (
    <div className="flex items-center gap-2 justify-between p-0.5">
      <img src={logo} className="w-4 h-4 object-contain" />
      <span>{balance.toFixed(3)}</span>
      <span className="ml-auto text-sm">{symbol}</span>
    </div>
  );
};

function Balances(props: { wallet: TConnectedWallet; chain: Chain }) {
  const { data: coins = [], isLoading } = useBalsQuery({
    ...props.chain,
    id: props.wallet.chainId,
    walletAddr: props.wallet.address,
  });

  if (isLoading) return <p className="text-sm mb-4">Fetching balances...</p>;

  if (coins.length <= 0 || coins.some((c) => c.balance <= 0))
    return <p className="text-sm mb-4">Wallet is empty...</p>;

  return (
    <div className="grid gap-1 mb-4">
      {coins.map((coin) => (
        <Token key={coin.token_id} {...coin} />
      ))}
    </div>
  );
}

export default ConnectedWallet;
