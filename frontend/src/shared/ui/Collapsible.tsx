import { Disclosure } from "@headlessui/react";
import ChevronSvg from "@/assets/chevron2.svg";

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
              "w-full gap-3 flex items-center px-4 py-3 justify-between h-15 border-b border-text-primary/10"
            }>
            <h3 className="font-medium text-xl">{title}</h3>
            <ChevronSvg
              className="transform transition-transform duration-200 w-6 h-6 text-text-primary"
              style={{
                transform: open ? "rotate(180deg)" : "rotate(0deg)"
              }}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 py-3">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Collapsible;
