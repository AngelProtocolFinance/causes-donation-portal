import { TxStep } from "types";
import { useMemo } from "react";
import DContent from "./DialogContent";
import KYCForm from "./KycForm";
import { Dialog } from "@headlessui/react";

type Props = {
  step: TxStep;
  txHash: string;
  resetTx(): void;
};

function TxPrompt({ step, txHash, resetTx }: Props) {
  const content = useMemo(() => {
    switch (step) {
      case TxStep.Waiting:
        return <DContent title="Submitting Transaction..." />;
      case TxStep.Success:
        return (
          <DContent title="Transaction Submitted!" txHash={txHash} shareable />
        );
      case TxStep.KYC:
        return <KYCForm />;
      case TxStep.KYCSuccess:
        return <DContent title="Form Sent!" resetable />;
      case TxStep.KYCFailed:
        return <DContent title="Form Failed to Send :(!" resetable />;
      case TxStep.Failed:
        return <DContent title="Transaction Failed :(" resetable />;
      default:
        return null;
    }
  }, [step]);

  return (
    <Dialog
      className="relative z-50"
      open={step !== TxStep.Idle}
      onClose={resetTx}
    >
      {/**backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <Dialog.Panel className="dark:bg-blue-d7 fixed-center p-8 rounded-md z-10 border border-prim">
        {content}
      </Dialog.Panel>
    </Dialog>
  );
}

export default TxPrompt;
