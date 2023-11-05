import { Disclosure } from "@headlessui/react";
import ChevronSvg from "@/assets/chevron2.svg";
import { twMerge } from "tailwind-merge";

const Collapsible = ({
  title,
  children
}: {
  title: string;
  children: JSX.Element[] | JSX.Element;
}) => {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={
              "w-full gap-3 flex items-center py-3 px-4 justify-between h-15 border-b border-text-primary/10"
            }>
            <h2 className="font-medium text-xl">{title}</h2>
            <ChevronSvg
              className={twMerge(
                "transform transition-transform duration-200 w-6 h-6 text-text-primary",
                open ? "-rotate-90" : "rotate-90"
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="py-3">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Collapsible;
