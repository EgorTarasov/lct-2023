import Collapsible from "@/ui/Collapsible";
import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";
import { OnboardingPageViewModel } from "./onboarding.vm";
import { Loading } from "@/components/loading/Loading";
import { CourseDto } from "api/models/course.model";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Checkbox, IconText } from "@/ui";
import ClockIcon from "@/assets/clock.svg";
import { convertMinutes } from "@/utils/dateConverters";
import ChevronIcon from "@/assets/chevron2.svg";

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
          <p className="text-lg leading-none">{item.name}</p>
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

export const OnboardingPage = observer(() => {
  const [vm] = useState(() => new OnboardingPageViewModel());

  return (
    <div className="flex flex-col gap-4 sm:px-4 mx-auto mt-10 max-w-screen-desktop">
      <div className="flex justify-between">
        <h2 className="text-4xl font-medium">Мой онбординг</h2>
        <span className="text-primary text-2xl"></span>
      </div>
      {vm.isLoading ? (
        <Loading />
      ) : vm.course === null ? (
        <div className="flex justify-center items-center w-full h-48">
          <p className="text-2xl text-center">Скоро здесь появится курс, подожди еще немного!</p>
        </div>
      ) : (
        <ul className="p-5 bg-white flex flex-col rounded-2xl">
          <Collapsible title={vm.course.title}>
            {vm.course.files.map((file, index) => (
              <TaskLink key={index} courseId={vm.course!.id} item={file} />
            ))}
          </Collapsible>
        </ul>
      )}
    </div>
  );
});
