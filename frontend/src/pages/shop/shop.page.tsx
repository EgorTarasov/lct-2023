import { useState } from "react";
import { Input } from "@/ui/Input.tsx";
import SearchIcon from "@/assets/search.svg";
import { Chip } from "@/ui";

enum Filter {
  All,
  Material,
  Digital
}

export const ShopPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>(Filter.All);
  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      <Input
        id={"search"}
        placeholder={"Поиск"}
        rightIcon={<SearchIcon />}
        className=""
        value={search}
        onChange={setSearch}
      />
      <div className={"flex items-center gap-2 flex-wrap"}>
        <Chip
          title={"Все"}
          onClick={() => setFilter(Filter.All)}
          isActive={filter === Filter.All}
        />
        <Chip
          title={"Материальные"}
          onClick={() => setFilter(Filter.Material)}
          isActive={filter === Filter.Material}
        />
        <Chip
          title={"Цифровые"}
          onClick={() => setFilter(Filter.Digital)}
          isActive={filter === Filter.Digital}
        />
      </div>
      <ul className="flex flex-col justify-between items-center gap-4">
        <p>Закрыто на инвентаризацию 🛒</p>
      </ul>
    </div>
  );
};
