import { Tabs } from "@/ui/Tabs.tsx";
import SearchIcon from "@/assets/search.svg";
import { Input } from "@/ui";
import { useState } from "react";
import { ContactListSection } from "./section/contactList.section.tsx";

export const StaffPage = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="py-6 mt-4 flex flex-col gap-4 mx-auto max-w-screen-desktop">
      <Input
        id={"search"}
        placeholder={"Поиск"}
        rightIcon={<SearchIcon />}
        className="px-4"
        value={search}
        onChange={setSearch}
      />
      <Tabs
        tabs={[
          {
            title: "Контакты",
            element: <ContactListSection />
          },
          {
            title: "Знакомства",
            element: <p>В разработке</p>
          }
        ]}
      />
    </div>
  );
};
