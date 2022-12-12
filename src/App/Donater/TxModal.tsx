import { Dialog } from "@headlessui/react";
import angelIcon from "assets/icons/angelwing_bl.png";
import { chains } from "constants/chains";
import { app } from "constants/config";
import { useModalContext } from "contexts/ModalContext";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

type Props = {
  message: string;
  tx?: { hash: string; chainId: string };
  shareable?: true;
};

export default function TxModal({ message, tx, shareable }: Props) {
  const { closeModal } = useModalContext();
  return (
    <Dialog.Panel className="w-full max-w-xs grid place-items-center fixed-center z-20 bg-white dark:bg-blue-d7 fixed-center p-8 rounded-md border border-prim">
      <img src={angelIcon} alt="" className="w-32 h-32 object-contain" />
      <Dialog.Title className="mb-1 text-center">{message}</Dialog.Title>

      {tx && (
        <p className="flex gap-2 text-sm items-baseline">
          <span className="text-xs uppercase">Tx hash:</span>
          <a
            className="text-blue-d1 hover:text-blue"
            href={chains[tx.chainId].txExplorer + `/${tx.hash}`}
            target="_blank"
          >
            {tx.hash.slice(0, 5)}...{tx.hash.slice(-5)}
          </a>
        </p>
      )}

      {shareable && (
        <div className="flex items-center gap-2 mt-4 mb-2">
          <TwitterShareButton
            title={app.share.message}
            hashtags={app.share.twitterTags}
            related={[]}
            url={app.url}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <FacebookShareButton quote={app.share.message} url={app.url}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
      )}

      <button
        onClick={closeModal}
        className="mt-4 p-2 uppercase btn-blue text-xs font-extrabold rounded"
      >
        Go Back
      </button>
    </Dialog.Panel>
  );
}
