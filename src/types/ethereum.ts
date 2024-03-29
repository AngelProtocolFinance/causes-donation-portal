import { EIP1193Events } from "constants/ethereum";
import { ethers } from "ethers";

export interface Web3Provider extends ethers.providers.Web3Provider {}

/*** EIP1193 spec https://eips.ethereum.org/EIPS/eip-1193*/
//request
interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

export type AccountChangeHandler = (accounts: string[]) => void;
export type ChainChangeHandler = (chainId: string) => void;

EIP1193Events.accountsChanged;

export type InjectedProvider = {
  chainId: string;
  request: <T>(args: RequestArguments) => Promise<T>;
  on(ev: "chainChanged", listener: ChainChangeHandler): any;
  on(ev: "accountsChanged", listener: AccountChangeHandler): any;
  /** some wallets are not compliant to EIP1193 specs
   * Binance - no removeListener in window.BinanceChain
   */
  removeListener?(ev: "chainChanged", listener: ChainChangeHandler): any;
  removeListener?(ev: "accountsChanged", listener: AccountChangeHandler): any;
  removeAllListeners?: any;
};
