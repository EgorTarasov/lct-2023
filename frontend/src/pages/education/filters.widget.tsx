import { MockCourses } from "api/models/course.model.ts";
import { Input } from "@/ui/Input.tsx";
import SearchIcon from "@/assets/search.svg";
import { Chip } from "@/ui";
import { useEffect, useState } from "react";
import { CourseCard } from "@/components/cards/course-card.widget";
import { observer } from "mobx-react-lite";
import { EducationPageViewModel } from "./education.vm";
import { useParams, useSearchParams } from "react-router-dom";
import { FCVM } from "@/utils/fcvm";

enum Filter {
  All,
  Assigned,
  NotAssigned,
  Completed
}

export const EducationFilters: FCVM<EducationPageViewModel> = observer(({ vm }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>(Filter.All);

  return (
    <>
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
    </>
  );
});
