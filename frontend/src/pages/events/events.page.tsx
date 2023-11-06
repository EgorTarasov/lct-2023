import { MockEvents } from "api/models/event.model.ts";
import { useState } from "react";
import { Chip } from "@/ui/chips.tsx";
import { Input } from "@/ui/Input.tsx";
import SearchIcon from "@/assets/search.svg";
import { EventCard } from "@/components/cards/event-card.widget";

enum Filter {
  ForMe,
  Sport,
  Education,
  Volunteering,
  Creativity
}

export const EventsPage = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filter[]>([Filter.ForMe]);

  const handleFilter = (filter: Filter) => {
    if (filters.includes(filter)) {
      setFilters(filters.filter((f) => f !== filter));
    } else {
      setFilters([...filters, filter]);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      <Input
        id={"search"}
        placeholder={"Поиск"}
        icon={<SearchIcon />}
        className=""
        value={search}
        onChange={setSearch}
      />
      <div className={"flex items-center gap-2 flex-wrap"}>
        <Chip
          title={"Для меня"}
          onClick={() => handleFilter(Filter.ForMe)}
          isActive={filters.includes(Filter.ForMe)}
        />
        <Chip
          title={"Спорт"}
          onClick={() => handleFilter(Filter.Sport)}
          isActive={filters.includes(Filter.Sport)}
        />
        <Chip
          title={"Обучение"}
          onClick={() => handleFilter(Filter.Education)}
          isActive={filters.includes(Filter.Education)}
        />
        <Chip
          title={"Волонтёрство"}
          onClick={() => handleFilter(Filter.Volunteering)}
          isActive={filters.includes(Filter.Volunteering)}
        />
        <Chip
          title={"Творчество"}
          onClick={() => handleFilter(Filter.Creativity)}
          isActive={filters.includes(Filter.Creativity)}
        />
      </div>
      <ul className="flex flex-col justify-between items-center gap-4">
        {MockEvents.map((v, i) => (
          <EventCard item={v} onRegisterClick={() => console.log(v.id)} key={v.id} wide />
        ))}
      </ul>
    </div>
  );
};
