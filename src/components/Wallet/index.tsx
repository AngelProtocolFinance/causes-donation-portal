import WalletSelectionOpener from "./WalletSelectionOpener";
import ConnectedButton from "./ConnectedWallet";
import { useWalletContext } from "contexts/WalletContext/WalletCtx";

const Wallet = () => {
  const walletState = useWalletContext();
  if (walletState === "loading") return <div className="pr-2">Loading...</div>;
  if (Array.isArray(walletState)) {
    return <WalletSelectionOpener wallets={walletState} />;
  }
  return <ConnectedButton wallet={walletState} />;
};

export default Wallet;
