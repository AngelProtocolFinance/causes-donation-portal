import { Coin, MsgSend } from "@terra-money/terra.js";
import { UserDenied, useWallet } from "@terra-money/wallet-provider";
import { ApesAddresses } from "constants/constants";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { getProvider } from "helpers/getProvider";
import { useState } from "react";
import { TxStep, WithBalance } from "types";
import ERC20Abi from "abi/ERC20.json";
import {
  EVMContract,
  TransactionResponse,
  Web3Provider,
} from "types/third-party/ethers";
import { parseUnits } from "helpers/third-party/ethers";
import { scaleAmount } from "helpers/third-party/terra";

export default function useDonate(donationAmount: string, token: WithBalance) {
  const { post } = useWallet();
  const { wallet, isProviderLoading, isWalletLoading } = useGetWallet();
  const [txStep, setTxStep] = useState<TxStep>(TxStep.Idle);
  const [txHash, setTxHash] = useState("");

  const donate = async () => {
    try {
      if (!wallet) return;
      if (!token) return;
      if (isNaN(+donationAmount)) {
        alert("Please enter valid amount");
        return;
      }

      if (+donationAmount <= 0) {
        alert("Please input a number greater than 0.001");
        return;
      }

      if (token.balance < +donationAmount) {
        alert("Not enough balance");
        return;
      }

      if (wallet.chainId !== token.chain_id) {
        alert(
          `Kindly switch network to ${token.chain_name} and reload the page`
        );
        return;
      }

      if (wallet.type === "evm") {
        setTxStep(TxStep.Waiting);
        const provider = new Web3Provider(
          //wallet is connected to send this tx
          getProvider(wallet.providerId) as any
        );
        const signer = provider.getSigner();

        const txAmount = parseUnits(donationAmount, token.decimals);
        const receiver = ApesAddresses["ethCharityRelief"];

        let response: TransactionResponse;
        if (token.contract_addr) {
          const ER20Contract: any = new EVMContract(
            token.contract_addr,
            ERC20Abi,
            signer
          );
          response = await ER20Contract.transfer(receiver, txAmount);
        } else {
          response = await signer.sendTransaction({
            from: wallet.address,
            to: receiver,
            value: txAmount,
          });
        }

        setTxHash(response.hash);
        setTxStep(TxStep.Success);
        return;

        /**terra txs */
      } else if (wallet.type === "terra") {
        if (!wallet) {
          setTxStep(TxStep.Failed);
          return;
        }
        setTxStep(TxStep.Waiting);

        const uamount = scaleAmount(donationAmount, token.decimals);

        const sendMsg = new MsgSend(wallet.address, ApesAddresses["terra"], [
          new Coin(token.denom, uamount),
        ]);
        /* Wallet Transaction */
        const res = await post({
          msgs: [sendMsg], //TODO: add message
        });

        if (res.success) {
          setTxHash(res.result.txhash);
          setTxStep(TxStep.Success);
        }
        return;
      }
    } catch (err: any) {
      console.error(err);
      if (err instanceof UserDenied) {
        setTxStep(TxStep.Idle);
      } else if ("code" in err) {
        if (err.code === 4001) setTxStep(TxStep.Idle);
      } else {
        setTxStep(TxStep.Failed);
      }
    }
  };

  function resetTx() {
    setTxHash("");
    setTxStep(TxStep.Idle);
  }

  return {
    donate,
    isWalletConnected: wallet !== undefined,
    isDonateDisabled: isProviderLoading || isWalletLoading || !token,
    donateText: (() => {
      if (!wallet) return "Connect Wallet";
      if (isProviderLoading || isWalletLoading) return "Wallet is loading";
      return "Donate now";
    })(),
    txStep,
    txHash,
    resetTx,
  };
}
