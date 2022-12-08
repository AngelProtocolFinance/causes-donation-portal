import { WalletSelectionOpener } from "./wallet-selection";
import ConnectedWallet from "./ConnectedWallet";
import { useWalletContext } from "contexts/WalletContext/WalletCtx";

const Wallet = () => {
  const walletState = useWalletContext();
  if (walletState === "loading")
    return <div className="pr-2 text-white">Loading...</div>;
  if (Array.isArray(walletState)) {
    return <WalletSelectionOpener wallets={walletState} />;
  }
  return <ConnectedWallet wallet={walletState} />;
};

export default Wallet;
