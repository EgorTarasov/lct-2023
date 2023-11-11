import { Tab } from "@headlessui/react";
import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Tab {
  title: string;
  element: ReactNode;
}

export const Tabs: FC<{ tabs: Tab[]; className?: string }> = ({ tabs, className }) => {
  return (
    <Tab.Group>
      <Tab.List className={twMerge("flex items-center gap-3 mx-3", className)}>
        {tabs.map((t, i) => (
          <Tab
            key={i}
            className={({ selected }) =>
              twMerge(
                "text-lg p-2 text-text-primary/60 border-b border-transparent",
                selected && "text-primary border-primary"
              )
            }>
            {t.title}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabs.map((t, i) => (
          <Tab.Panel key={i}>{t.element}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
