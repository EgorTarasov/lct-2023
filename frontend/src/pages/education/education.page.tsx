import { MockCourses } from "api/models/course.model.ts";
import { Input } from "@/ui/Input.tsx";
import SearchIcon from "@/assets/search.svg";
import { Chip } from "@/ui";
import { useState } from "react";
import { CourseCard } from "@/components/cards/course-card.widget";

enum Filter {
  All,
  Assigned,
  NotAssigned,
  Completed
}

export const EducationPage = () => {
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
          title={"Назначенные"}
          onClick={() => setFilter(Filter.Assigned)}
          isActive={filter === Filter.Assigned}
        />
        <Chip
          title={"Не назначенные"}
          onClick={() => setFilter(Filter.NotAssigned)}
          isActive={filter === Filter.NotAssigned}
        />
        <Chip
          title={"Завершенные"}
          onClick={() => setFilter(Filter.Completed)}
          isActive={filter === Filter.Completed}
        />
      </div>
      <ul className="flex flex-col justify-between items-center gap-4">
        {MockCourses.map((v, i) => (
          <CourseCard item={v} key={v.id} wide />
        ))}
      </ul>
    </div>
  );
};
