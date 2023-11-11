import { FCVM } from "@/utils/fcvm";
import { observer } from "mobx-react-lite";
import { EducationPageViewModel } from "../education.vm";
import ChevronIcon from "@/assets/chevron2.svg";
import { Button, Checkbox, IconText } from "@/ui";
import { CourseDto } from "api/models/course.model";
import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import ClockIcon from "@/assets/clock.svg";
import { convertMinutes } from "@/utils/dateConverters";
import { useMemo } from "react";

const TaskLink = ({ item, courseId }: { item: CourseDto.CourseFile; courseId: number }) => {
  const randomTimeMin = useMemo(() => {
    const hash = item.name
      .split("")
      .reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);

    const times = [10, 30, 60, 90];
    return times[Math.abs(hash) % times.length];
  }, []);
  return (
    <li className="border-b border-text-primary/20 py-2 mb-2">
      <Link
        to={`/education/${courseId}/task/${item.id}`}
        className={twMerge(
          "relative flex gap-3 items-start"
          // , item.isCompleted && "opacity-60"
        )}>
        <Checkbox checked={false} className={"mt-1 text-primary"} disabled ariaHidden />
        <div className="flex flex-col">
          <p className="text-lg leading-none">{item.name.replace(".docx", "")}</p>
          <ul className="flex flex-wrap gap-2 mt-3">
            <IconText
              icon={ClockIcon}
              text={convertMinutes(randomTimeMin)}
              alt={"Время на решение"}
            />
          </ul>
        </div>
        <ChevronIcon className="ml-auto my-auto" />
      </Link>
    </li>
  );
};

export const CourseSection: FCVM<EducationPageViewModel> = observer(({ vm }) => {
  const navigate = useNavigate();
  if (vm.pageState.view !== "course") return null;

  const course = vm.pageState.course;

  return (
    <section className="flex flex-col gap-8 py-6">
      <Button
        appearance="secondary"
        className="w-fit gap-1 text-text-primary/60 px-2"
        onClick={() => navigate("/education")}>
        <ChevronIcon className="w-6 h-6 rotate-180" />
        Назад к курсам
      </Button>
      <div className="p-5 bg-white flex flex-col gap-4 rounded-2xl">
        <h2 className="font-medium text-2xl">{course.title}</h2>
        <ul>
          {course.files.map((file, i) => (
            <TaskLink key={i} item={file} courseId={course.id} />
          ))}
        </ul>
      </div>
    </section>
  );
});
