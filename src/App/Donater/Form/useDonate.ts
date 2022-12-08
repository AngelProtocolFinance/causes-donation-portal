import {
  TransactionRequest,
  TransactionResponse,
} from "@ethersproject/abstract-provider";
import { Coin, MsgExecuteContract, MsgSend } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
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

export default function useDonate() {
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FV>();
  const terraWallet = useConnectedWallet();
  const { showModal } = useModalContext();

  const submit: SubmitHandler<FV> = async ({ coin, wallet }) => {
    const chain = chains[wallet.chainId];
    try {
      if (chain.type === "terra") {
        let msg: MsgSend | MsgExecuteContract;
        const amount = scaleToStr(coin.amount);
        if (coin.type === "terra-native" || coin.type === "ibc") {
          msg = new MsgSend(wallet.address, ApesAddresses.terra, [
            new Coin(coin.token_id, amount),
          ]);
          /** cw20 */
        } else {
          msg = new MsgExecuteContract(wallet.address, coin.token_id, {
            transfer: {
              amount,
              recipient: ApesAddresses.terra,
            },
          });
          /** terra wallet is defined */
        }
        const { success, result } = await terraWallet!.post({ msgs: [msg] });
        if (success) {
          showModal(TxModal, {
            message: "Donation submitted!",
            tx: { hash: result.txhash, chainId: wallet.chainId },
            shareable: true,
          });
        } else {
          showModal(TxModal, {
            message: "Transaction failed",
            tx: { hash: result.txhash, chainId: wallet.chainId },
          });
        }
      } else {
        const wei_amount = ethers.utils.parseEther(`${coin.amount}`);
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
        showModal(TxModal, {
          message: "Donation successful!",
          tx: { hash: res.hash, chainId: wallet.chainId },
          shareable: true,
        });
      }
    } catch (err) {
      showModal(TxModal, {
        message: "Transaction error occured",
      });
    } finally {
      reset(undefined, { keepDefaultValues: true });
    }
  };

  return { submit: handleSubmit(submit), isSubmitting };
}
