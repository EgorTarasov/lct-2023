import { FCVM } from "@/utils/fcvm";
import { observer } from "mobx-react-lite";
import { EducationPageViewModel } from "../education.vm";
import { CourseCard } from "@/components/cards/course-card.widget";
import { EducationFilters } from "../filters.widget";

export const CourseListSection: FCVM<EducationPageViewModel> = observer(({ vm }) => {
  if (vm.pageState.view !== "all") return null;

  return (
    <section className="flex flex-col gap-3 appear">
      <EducationFilters vm={vm} />
      <ul
        className="grid gap items-center gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(256px, 1fr))"
        }}>
        {vm.pageState.courses.map((v, i) => (
          <CourseCard key={i} item={v} />
        ))}
      </ul>
    </section>
  );
});
