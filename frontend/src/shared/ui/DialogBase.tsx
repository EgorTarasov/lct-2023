import { Button } from "@/ui/Button";
import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";

interface DialogBaseProps {
  isOpen: boolean;
  onCancel?: () => void;
  children?: JSX.Element | JSX.Element[];
  title: string;
  onConfirm: () => void;
  confirmText: string;
  subtitle?: string;
  width?: string | number;
  coolBlur?: boolean;
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
  subtitle,
  width,
  coolBlur,
  bottom,
  confirmDisabled
}) => {
  function closeModal() {
    onCancel?.();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
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
                className="w-full transform overflow-hidden rounded-xl text-text-primary bg-bg-primary border-border-primary border text-left align-middle shadow-xl transition-all"
                style={{ width }}>
                <Dialog.Title as="h3" className="text-xl font-medium p-6 flex flex-col gap-1">
                  {title}
                  {subtitle && <span className="text-text-secondary text-sm">{subtitle}</span>}
                </Dialog.Title>
                <Dialog.Description as="div" className="flex flex-col gap-3 px-6">
                  {children}
                </Dialog.Description>
                <div className="flex border-t-[1px] border-border-primary p-3 mt-6 bg-bg-secondary">
                  {onCancel && (
                    <Button appearance="secondary" onClick={closeModal} className="w-fit">
                      Отмена
                    </Button>
                  )}
                  <div className="flex items-center ml-auto gap-3">
                    {bottom}
                    <Button
                      appearance="primary"
                      onClick={onConfirm}
                      disabled={confirmDisabled}
                      className={`w-fit ${coolBlur ? "with-cool-blur" : ""}`}>
                      {confirmText}
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
