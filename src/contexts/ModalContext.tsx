import { Dialog } from "@headlessui/react";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { FC } from "react";

type Func = () => void;
type Opener = <T extends {}>(Modal: FC<T>, props: T) => void;
type ContextState = {
  showModal: Opener;
  closeModal(): void;
  isModalOpen: boolean;
};

export default function ModalContext(
  props: PropsWithChildren<{ id?: string }>
) {
  const [Modal, setModal] = useState<ReactNode>();

  const showModal: Opener = useCallback((Modal, props) => {
    setModal(<Modal {...props} />);
  }, []);

  const closeModal: Func = useCallback(() => {
    setModal(undefined);
  }, []);

  return (
    <Context.Provider
      value={{
        isModalOpen: !!Modal,
        showModal,
        closeModal,
      }}
    >
      <Dialog
        open={Modal !== undefined}
        onClose={closeModal}
        className="relative z-50"
      >
        <div className="z-10 fixed inset-0 bg-black/50" aria-hidden="true" />
        {Modal /** should always be wrapped with Dialog.Panel */}
      </Dialog>

      {props.children}
    </Context.Provider>
  );
}

const Context = createContext<ContextState>({} as ContextState);

export const useModalContext = () => {
  const val = useContext(Context);
  if (Object.entries(val).length <= 0) {
    throw new Error("This hook can only be used inside Modalcontext");
  }
  return val;
};
