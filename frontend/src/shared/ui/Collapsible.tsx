import { Disclosure } from "@headlessui/react";
import ChevronSvg from "@/assets/chevron2.svg";
import { twMerge } from "tailwind-merge";
import { Separator } from ".";

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
          <Disclosure.Button className={"w-full flex flex-col items-center justify-between"}>
            <div className="flex gap-3 items-center justify-between w-full h-8 px-4">
              <h2 className="font-medium text-xl">{title}</h2>
              <ChevronSvg
                className={twMerge(
                  "transform transition-transform duration-200 w-6 h-6 text-text-primary",
                  open ? "-rotate-90" : "rotate-90"
                )}
              />
            </div>
            <Separator className="my-3" />
          </Disclosure.Button>
          <Disclosure.Panel className="py-3">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Collapsible;
