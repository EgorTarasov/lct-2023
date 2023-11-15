import { EventDto, MockEvents } from "api/models/event.model.ts";
import { useEffect, useState } from "react";
import { Chip, Input } from "@/ui";
import SearchIcon from "@/assets/search.svg";
import { EventCard } from "@/components/cards/event-card.widget";
import api from "api/utils/api";
import { EventsEndpoint } from "api/endpoints/events.endpoint";

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
  const [events, setEvents] = useState<EventDto.Item[]>([]);
  const [filtered, setFiltered] = useState(events);

  const handleFilter = (filter: Filter) => {
    if (filters.includes(filter)) {
      setFilters(filters.filter((f) => f !== filter));
    } else {
      setFilters([...filters, filter]);
    }
  };

  const fetchEvents = async () => {
    const res = await EventsEndpoint.current();
    setEvents(res.map(EventDto.convertDtoToItem));
  };

  const registerEvent = async (id: number) => {
    await EventsEndpoint.enroll(id);
    await fetchEvents();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const filtered = events.filter((event) => {
      if (filters.includes(Filter.Sport)) {
        return event.category === "sport";
      }
      if (filters.includes(Filter.Education)) {
        return event.category === "education";
      }
      if (filters.includes(Filter.Volunteering)) {
        return event.category === "charity";
      }
      if (filters.includes(Filter.Creativity)) {
        return event.category === "art";
      }
      return true;
    });
    setFiltered(filtered);
  }, [events, filters]);

  useEffect(() => {
    const newFiltered = filtered.filter((event) => {
      return event.title.toLowerCase().includes(search.toLowerCase());
    });
    setFiltered(newFiltered);
  }, [search]);

  return (
    <div className="flex flex-col gap-4 px-4 mx-auto max-w-screen-desktop fade-enter-done mt-6 sm:mt-10">
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
      <ul
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(256px, 1fr))"
        }}>
        {events.map((v, i) => (
          <EventCard item={v} onRegisterClick={() => registerEvent(v.id)} key={v.id} wide />
        ))}
      </ul>
    </div>
  );
};
