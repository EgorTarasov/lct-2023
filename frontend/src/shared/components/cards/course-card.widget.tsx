import { getCourseMap } from "@/constants/course.map";
import { CourseDto } from "api/models/course.model";
import { differenceInDays } from "date-fns";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import FireIcon from "@/assets/fire.svg";
import CalendarIcon from "@/assets/calendar.svg";
import ClockIcon from "@/assets/clock.svg";
import LightningIcon from "@/assets/lightning.svg";
import { IconText } from "@/ui/IconText";
import { convertDate } from "@/utils/dateConverters";
import { twMerge } from "tailwind-merge";
import { ProgressLine } from "@/ui/ProgressLine.tsx";

export const CourseCard = ({ item, wide }: { item: CourseDto.Item; wide?: boolean }) => {
  const { illustration: Icon, locale } = getCourseMap(item.type);
  const isDeadlineClose = useMemo(() => differenceInDays(new Date(), item.deadline) < 3, [item]);
  const isDeadlineExpired = useMemo(() => item.deadline < new Date(), [item]);

  return (
    <li className={twMerge(wide && "w-full")}>
      <Link
        to={`/education/${item.id}`}
        className={twMerge(
          "flex p-5 gap-3 rounded-2xl border border-text-primary/20 transition-shadow shadow-none hover:shadow-sm bg-white",
          item.isCompleted && "opacity-60"
        )}>
        <Icon className="text-primary" />
        <div className="flex flex-col gap-2 w-full">
          <h4 className="leading-5 text-lg">{item.title}</h4>
          <ul className="flex flex-wrap gap-2 items-center">
            <IconText
              icon={isDeadlineClose ? FireIcon : CalendarIcon}
              alt="Дедлайн"
              text={convertDate(item.deadline)}
            />
            <IconText
              icon={ClockIcon}
              alt="Время выполнения"
              text={`${item.timeEstimateMin} мин`}
            />
            <IconText icon={LightningIcon} alt="Баллы" text={item.points.toString()} iconPrimary />
          </ul>
          <ProgressLine progress={item.progress} />
        </div>
      </Link>
    </li>
  );
};
