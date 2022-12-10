import { ConnectedWallet } from "contexts/WalletContext";
import { Coin, CoinWithAmount } from "types";

export type FormValues = {
  coin: Coin;
  amount: string;
};
