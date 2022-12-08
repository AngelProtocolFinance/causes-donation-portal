import { ConnectedWallet } from "contexts/WalletContext";
import { CoinWithAmount } from "types";

export type FormValues = {
  coin: CoinWithAmount;
  //meta
  coins: CoinWithAmount[];
  wallet: ConnectedWallet;
};
