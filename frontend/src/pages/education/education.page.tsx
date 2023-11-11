import { ReactNode, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { EducationPageViewModel, ViewType } from "./education.vm";
import { useParams, useSearchParams } from "react-router-dom";
import { CourseListSection } from "./views/course-list.section";
import { CourseSection } from "./views/course.section";
import { Loading } from "@/components/loading/Loading";
import { CourseTask } from "./views/course-task.section";

export const EducationPage = observer(() => {
  const { id, taskId } = useParams();
  const [vm] = useState(() => new EducationPageViewModel(id, taskId));

  const pages: Record<ViewType, ReactNode> = useMemo(
    () => ({
      all: <CourseListSection vm={vm} />,
      course: <CourseSection vm={vm} />,
      courseTask: <CourseTask vm={vm} />,
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
