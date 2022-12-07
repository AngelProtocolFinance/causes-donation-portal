import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import getTxUrl from "helpers/getTxUrl";
import { Dialog } from "@headlessui/react";
import angelIcon from "assets/icons/angelwing_bl.png";

type Props = {
  title: string;
  txHash?: string;
  resetable?: true;
  shareable?: true;
};

const DialogContent = ({ title, txHash, resetable, shareable }: Props) => {
  const { wallet } = useGetWallet();
  return (
    <div className="grid place-items-center gap-1">
      <img src={angelIcon} alt="" className="w-32 h-32 object-contain" />
      <Dialog.Title>{title}</Dialog.Title>
      {!!txHash && (
        <p className="flex gap-2 text-sm items-baseline">
          <span className="text-xs uppercase">Tx hash:</span>
          <a
            className="text-blue-d1 hover:text-blue"
            href={getTxUrl(txHash, wallet?.chainId)}
            target="_blank"
          >
            {txHash.slice(0, 5)}...{txHash.slice(-5)}
          </a>
        </p>
      )}

      {shareable && <Share />}
      {resetable && (
        <button
          onClick={() => window.location.reload()}
          className="mt-2 p-2 uppercase btn-blue text-xs font-extrabold rounded"
        >
          Go Back
        </button>
      )}
    </div>
  );
};

export default DialogContent;

function Share() {
  return (
    <>
      <div className="">
        <button
          className="btn-blue mt-2 p-2 uppercase text-xs font-extrabold rounded-md mb-4"
          onClick={() => window.location.reload()}
        >
          Go Back
        </button>
        {/* <button onClick={() => setStatus(TxStep.KYC)}>
                      Get Receipt
                  </button> */}
      </div>
      <div className="flex items-center gap-2">
        <TwitterShareButton
          title="I just donated to help make charities whole again on @AngelProtocol! Please join me in helping out the cause"
          hashtags={["makewhole"]}
          related={[]}
          url="https://make-whole.angelprotocol.io"
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <FacebookShareButton
          quote="I just donated to help make charities whole again on Angel Protocol! Please join me in helping out the cause"
          url="https://make-whole.angelprotocol.io"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>
    </>
  );
}

/** eth success, success, share  */

/**
 * 
 * step === TxStep.Failed ||
        step === TxStep.KYCFailed ||
        step === TxStep.KYCSuccess) && (
 */
