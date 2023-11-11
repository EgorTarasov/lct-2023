import { ReactNode, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { EducationPageViewModel, ViewType } from "./education.vm";
import { useParams, useSearchParams } from "react-router-dom";
import { CourseListSection } from "./views/course-list.section";
import { CourseSection } from "./views/course.section";
import { Loading } from "@/components/loading/Loading";

export const EducationPage = observer(() => {
  const [vm] = useState(() => new EducationPageViewModel());
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      vm.loadCourse(id);
    } else {
      vm.load();
    }

    // if (searchParams.has("search")) {
    //   setSearch(searchParams.get("search")!);
    // }
  }, [searchParams]);

  const pages: Record<ViewType, ReactNode> = useMemo(
    () => ({
      all: <CourseListSection vm={vm} />,
      course: <CourseSection vm={vm} />,
      courseTask: <div>CourseTask</div>,
      loading: <Loading />
    }),
    [vm]
  );

  return (
    <div className="flex flex-col gap-4 px-4 py-6 h-full w-full items-center">
      <div className="flex-1 max-w-screen-desktop w-full flex flex-col">
        {pages[vm.pageState.view]}
      </div>
    </div>
  );
});
