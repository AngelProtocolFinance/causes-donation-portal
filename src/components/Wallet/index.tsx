import { useGetWallet } from "contexts/WalletContext/WalletContext";
import WalletSelectionOpener from "./WalletSelectionOpener";
import ConnectedButton from "./ConnectedWallet";

const Wallet = () => {
  const { wallet, isProviderLoading } = useGetWallet();
  if (isProviderLoading) return <div className="pr-2">Loading...</div>;
  if (!wallet) return <WalletSelectionOpener />;
  return <ConnectedButton />;
};

export default Wallet;
