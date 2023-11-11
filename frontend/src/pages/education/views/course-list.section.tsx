import { FCVM } from "@/utils/fcvm";
import { observer } from "mobx-react-lite";
import { EducationPageViewModel } from "../education.vm";
import { CourseCard } from "@/components/cards/course-card.widget";
import { EducationFilters } from "../filters.widget";

export const CourseListSection: FCVM<EducationPageViewModel> = observer(({ vm }) => {
  return (
    <section className="flex flex-col gap-3">
      <EducationFilters vm={vm} />
      <ul className="flex flex-col justify-between items-center gap-4">
        {vm.courses.map((v, i) => (
          <CourseCard item={v} key={v.id} wide />
        ))}
      </ul>
    </section>
  );
});
