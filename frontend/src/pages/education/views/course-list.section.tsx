import { FCVM } from "@/utils/fcvm";
import { observer } from "mobx-react-lite";
import { EducationPageViewModel } from "../education.vm";
import { CourseCard } from "@/components/cards/course-card.widget";
import { EducationFilters } from "../filters.widget";

export const CourseListSection: FCVM<EducationPageViewModel> = observer(({ vm }) => {
  if (vm.pageState.view !== "all") return null;

  return (
    <section className="flex flex-col gap-3 py-6">
      <EducationFilters vm={vm} />
      <ul className="flex flex-col justify-between items-center gap-4">
        {vm.pageState.courses.map((v, i) => (
          <CourseCard item={v} key={v.id} wide />
        ))}
      </ul>
    </section>
  );
});
