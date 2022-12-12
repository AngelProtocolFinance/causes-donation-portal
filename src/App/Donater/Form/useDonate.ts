import {
  TransactionRequest,
  TransactionResponse,
} from "@ethersproject/abstract-provider";
import { Coin, MsgExecuteContract, MsgSend } from "@terra-money/terra.js";
import {
  ConnectedWallet as TConnectedWallet,
  useConnectedWallet as useTerraWallet,
} from "@terra-money/wallet-provider";
import { chains } from "constants/chains";
import { ApesAddresses } from "constants/constants";
import { ethers } from "ethers";
import { scaleToStr } from "helpers/decimal";
import { getProvider } from "helpers/getProvider";
import { useFormContext, SubmitHandler } from "react-hook-form";
import ERC20Abi from "abi/ERC20.json";
import { FormValues as FV } from "../types";
import { useModalContext } from "contexts/ModalContext";
import TxModal from "../TxModal";
import { useConnectedWallet } from "contexts/WalletGuard";
import { ConnectedWallet } from "contexts/WalletContext";
import { useDonationLogMutation } from "services/apes";

export default function useDonate() {
  const {
    resetField,
    handleSubmit,
    formState: { isSubmitting, isValidating },
  } = useFormContext<FV>();
  const terraWallet = useTerraWallet();
  const wallet = useConnectedWallet();
  const { showModal } = useModalContext();
  const [saveDonation] = useDonationLogMutation();

  const submit: SubmitHandler<FV> = async ({ coin, amount }) => {
    const result = await sendTx(
      coin,
      amount,
      wallet,
      terraWallet! /** should be defined at this point */
    );
    if (result) {
      const { hash, recipient } = result;

      showModal(TxModal, { message: "Saving donation details.." });

      const res = await saveDonation({
        transactionId: hash,
        chainId: wallet.chainId,
        walletAddress: recipient,
        denomination: coin.symbol,
        amount: +amount,
      });

      if ("error" in res)
        return showModal(TxModal, {
          tx: { hash, chainId: wallet.chainId },
          message:
            "Transaction has been submitted but was not saved for receipt purposes. Kindly contact support@angelprotocol.io",
        });

      showModal(TxModal, {
        message: "Thank you for your donation!",
        tx: { hash, chainId: wallet.chainId },
      });
    } else {
      showModal(TxModal, { message: "Transaction failed" });
    }
    /** reset ammount */
    resetField("amount");
  };

  return { submit: handleSubmit(submit), isSubmitting, isValidating };
}

async function sendTx(
  coin: FV["coin"],
  _amount: string,
  wallet: ConnectedWallet,
  terraWallet: TConnectedWallet /** for posting terra tx TODO: tx.post should be part of generic wallet */
): Promise<{ hash: string; recipient: string } | null> {
  const chain = chains[wallet.chainId];
  try {
    if (chain.type === "terra") {
      let msg: MsgSend | MsgExecuteContract;
      const uamount = scaleToStr(_amount);
      const recipient = ApesAddresses.terra;
      if (coin.type === "terra-native" || coin.type === "ibc") {
        msg = new MsgSend(wallet.address, recipient, [
          new Coin(coin.token_id, uamount),
        ]);
        /** cw20 */
      } else {
        msg = new MsgExecuteContract(wallet.address, coin.token_id, {
          transfer: {
            amount: uamount,
            recipient: recipient,
          },
        });
      }
      const { success, result } = await terraWallet.post({ msgs: [msg] });
      return success ? { hash: result.txhash, recipient } : null;
      /** evm tx */
    } else {
      const wei_amount = ethers.utils.parseEther(`${_amount}`);
      const recipient = ApesAddresses.eth;
      const provider = new ethers.providers.Web3Provider(
        getProvider(wallet.id) as any
      );
      const tx: TransactionRequest = {
        from: wallet.address,
        to: ApesAddresses.eth,
        value: wei_amount,
      };
      const signer = provider.getSigner();
      let res: TransactionResponse;
      if (coin.type === "evm-native") {
        res = await signer.sendTransaction(tx);
      } else {
        const ER20Contract: any = new ethers.Contract(
          coin.token_id,
          ERC20Abi,
          signer
        );
        res = await ER20Contract.transfer(tx.to, tx.value);
      }
      return { hash: res.hash, recipient };
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}
