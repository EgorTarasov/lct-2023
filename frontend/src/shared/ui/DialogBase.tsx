import { Button } from "@/ui/Button";
import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import CrossIcon from "@/assets/cross.svg";

interface DialogBaseProps {
  isOpen: boolean;
  onCancel?: () => void;
  children?: JSX.Element | JSX.Element[];
  title: string;
  onConfirm?: () => void;
  confirmText?: string;
  width?: string | number;
  bottom?: JSX.Element;
  confirmDisabled?: boolean;
}

export const DialogBase: FC<DialogBaseProps> = ({
  isOpen,
  onCancel,
  children,
  title,
  onConfirm,
  confirmText,
  width,
  bottom,
  confirmDisabled
}) => {
  function closeModal() {
    onCancel?.();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog className="relative z-100" onClose={closeModal} onSubmit={(e) => e.preventDefault()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <Dialog.Backdrop className="fixed inset-0 bg-black/30 z-10" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto z-[11]">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel
                onSubmit={(e) => e.preventDefault()}
                className="w-fit transform text-text-primary bg-white border-border-primary border text-left align-middle transition-all rounded-2xl p-5"
                style={{ width }}>
                <Dialog.Title className="text-xl font-medium flex justify-between gap-1 mb-5">
                  {title}
                  {onCancel && (
                    <CrossIcon className="cursor-pointer" onClick={onCancel} width={24} />
                  )}
                </Dialog.Title>
                {children}
                {onConfirm && (
                  <div className="flex items-center ml-auto gap-3">
                    {bottom}
                    <button
                      className={
                        "w-full mt-5 bg-text-primary/5 rounded-lg py-3 text-text-primary/60 font-medium text-lg"
                      }
                      type="button"
                      onClick={onConfirm}
                      disabled={confirmDisabled}>
                      {confirmText}
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
