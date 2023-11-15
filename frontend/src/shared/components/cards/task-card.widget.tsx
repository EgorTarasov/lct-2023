import { getTaskMap } from "@/constants/task.map";
import { Button, Checkbox, IconText } from "@/ui";
import { TaskDto } from "api/models/task.model";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Chevron from "@/assets/chevron2.svg";
import FireIcon from "@/assets/fire.svg";
import CalendarIcon from "@/assets/calendar.svg";
import ClockIcon from "@/assets/clock.svg";
import LightningIcon from "@/assets/lightning.svg";
import PointIcon from "@/assets/marker.svg";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";
import { convertDate, convertMinutes } from "@/utils/dateConverters";

export const TaskCard = ({ item, onFinish }: { item: TaskDto.Item; onFinish?: () => void }) => {
  const { locale, textColor } = getTaskMap(item.type);
  const isDeadlineClose = useMemo(() => differenceInDays(new Date(), item.deadline) < 3, [item]);

  return (
    <li>
      <Link
        to="/tasks/id"
        className={twMerge("relative flex gap-3 items-start", item.isCompleted && "opacity-60")}>
        <Checkbox className={`mt-1 ${textColor}`} disabled checked={item.isCompleted} ariaHidden />
        <div className="flex flex-col">
          <span className={textColor}>{locale}</span>
          <p className="text-lg leading-none">{item.title}</p>
          <ul className="flex flex-wrap gap-2 mt-3">
            <IconText
              icon={isDeadlineClose ? FireIcon : CalendarIcon}
              text={convertDate(item.deadline)}
              alt="Конец срока"
            />
            <IconText
              icon={ClockIcon}
              text={convertMinutes(item.durationMin)}
              alt={"Время проведения"}
            />
            <IconText
              className={textColor}
              icon={LightningIcon}
              text={item.points.toString()}
              alt="Очков за прохождение"
            />
            <IconText icon={PointIcon} text={item.location} alt="" />
          </ul>
        </div>
        {onFinish ? (
          <Button
            disabled={item.status === "Завершена"}
            className="ml-auto my-auto w-fit px-3"
            appearance="secondary"
            onClick={() => onFinish?.()}>
            {item.status}
          </Button>
        ) : (
          <Chevron className="ml-auto my-auto" />
        )}
      </Link>
    </li>
  );
};
