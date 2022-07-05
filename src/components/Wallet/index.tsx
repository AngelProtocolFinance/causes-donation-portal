import { useGetWallet } from "contexts/WalletContext/WalletContext";
import WalletSelectionOpener from "./WalletSelectionOpener";
import ConnectedButton from "./ConnectedWallet";
import InitializingButton from "./InitializingButton";

const WalletButton = () => {
  const { wallet, isProviderLoading } = useGetWallet();
  if (isProviderLoading) return <InitializingButton />;
  if (!wallet) return <WalletSelectionOpener />;

  return <ConnectedButton />;
};

export default WalletButton;
