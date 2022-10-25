import { Dialog } from "@headlessui/react";

function WalletInstruction({ open, setOpen }: any) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <Dialog.Panel className="bg-slate-50 fixed-center p-4 rounded-md text-slate-700 max-w-md max-h-[80vh] overflow-y-auto">
        <Dialog.Title className="font-semibold text-lg uppercase mb-4">
          Wallet Instructions
        </Dialog.Title>
        <article className="leading-relaxed text-sm">
          <h4 className="text-sky-500 font-extrabold uppercase">
            Terra Station
          </h4>
          <p>
            <span className="font-bold block my-1">
              If you have Terra Station installed:
            </span>
            First, recover / make a new wallet and make sure you have enough
            balance. Then press Connect on the Top Right of Navigation or below,
            to see your Terra Station Options. Click Terra Station to connect
            via Chrome Extension, or click Wallet Connect to connect via Mobile.
            <span className="font-bold block my-1 mt-3">
              If you don't have Terra Station installed:
            </span>
            Use{" "}
            <a
              className="text-sky-500 underline"
              target="_blank"
              rel="noopenner noreferrer"
              href="https://chrome.google.com/webstore/detail/terra-station-wallet/aiifbnbfobpmeekipheeijimdpnlpgpp"
            >
              this{" "}
            </a>
            link to install MetaMask Wallet on your browser, set up according to
            wallet instructions then follow instructions above.
          </p>
        </article>
        <article className="leading-relaxed text-sm mt-6">
          <h4 className="text-amber-600 font-extrabold uppercase">Metamask</h4>
          <p>
            <span className="font-bold block my-1">
              If you have Metamask installed:
            </span>
            Please proceed with the Metamask Wallet Connection, after you will
            be able to donate ETH in the MetaMask Wallet. If you have xDefi
            Prioritized, then you will need to de-prioritize it before
            connecting to MetaMask.
            <span className="font-bold block my-1 mt-3">
              If you don't have Metamask installed:
            </span>
            Use{" "}
            <a
              className="text-sky-500 underline"
              target="_blank"
              rel="noopenner noreferrer"
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
            >
              this{" "}
            </a>
            link to install chrome extension on your browser, then follow
            instructions above. Or use Wallet Connect to connect via mobile.
          </p>
        </article>
        <article className="leading-relaxed text-sm mt-6">
          <h4 className="text-amber-400 font-extrabold uppercase">
            Binance Wallet
          </h4>
          <p>
            <span className="font-bold block my-1">
              If you have Binance Wallet installed:
            </span>
            Please proceed with the Binance Wallet Connection, after you will be
            able to donate BNB in the wallet. If you have xDefi Prioritized,
            then you will need to de-prioritize it before connecting to Binance
            Wallet.
            <span className="font-bold block my-1 mt-3">
              If you don't have Binance Wallet installed:
            </span>
            Use{" "}
            <a
              className="text-sky-500 underline"
              target="_blank"
              rel="noopenner noreferrer"
              href="https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp"
            >
              this{" "}
            </a>
            link to install chrome extension on your browser, then follow
            instructions above. Or use Wallet Connect to connect via mobile.
          </p>
        </article>
        <article className="leading-relaxed text-sm mt-6">
          <h4 className="text-sky-700 font-extrabold uppercase">
            Xdefi Wallet
          </h4>
          <p>
            <span className="font-bold block my-1">
              If you have Xdefi Wallet installed:
            </span>
            Make sure you are logged in and have enough balance. If you want to
            use ETH inside xDefi, click the hamburger on the top right, and set
            "Prioritize XDEFI" to true, then when you press Connect Button on
            the WebApp, you should see the ETH balance ready for use.
            <span className="font-bold block my-1 mt-3">
              If you don't have Xdefi Wallet installed:
            </span>
            Use{" "}
            <a
              className="text-sky-500 underline"
              target="_blank"
              rel="noopenner noreferrer"
              href="https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf"
            >
              this{" "}
            </a>
            link to install xDefi Wallet on your browser, then follow
            instructions above.
          </p>
        </article>

        {/* ... */}
      </Dialog.Panel>
    </Dialog>
  );
}

export default WalletInstruction;
