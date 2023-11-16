import { EventDto } from "api/models/event.model";
import { FC, useMemo } from "react";
import { getEventMap } from "@/constants/event.map";
import { Button } from "@/ui";
import ClockIcon from "@/assets/clock.svg";
import CalendarIcon from "@/assets/calendar.svg";
import LightningIcon from "@/assets/lightning.svg";
import MarkerIcon from "@/assets/marker.svg";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import { convertDate, convertMinutes } from "@/utils/dateConverters";
import { IconText } from "@/ui/IconText";

interface EventCardProps {
  item: EventDto.Item;
  onRegisterClick: () => void;
  wide?: boolean;
}

export const EventCard: FC<EventCardProps> = ({ item, onRegisterClick, wide }) => {
  const {
    illustration: Icon,
    locale,
    textColor
  } = useMemo(() => getEventMap(item.category), [item]);
  const ariaLabel = useMemo(
    () =>
      `Мероприятие ${item.title}, которое пройдет ${convertDate(item.deadline)} по адресу "${
        item.place
      }" и будет длиться ${convertMinutes(item.durationMin, true)}`,
    [item]
  );

  return (
    <li
      className={twMerge(
        "flex-col flex w-52 h-full rounded-2xl border border-text-primary/20 relative bg-white",
        wide ? "w-full" : "w-52"
      )}>
      <Icon className="text-primary rounded-2xl" />
      <div className="flex flex-col m-4 mt-3 flex-1">
        <span className={`text-sm ${textColor}`}>{locale}</span>
        <Link
          to={`/events/${item.id}`}
          aria-label={ariaLabel}
          className={"text-lg w-fit leading-none after:inset-0 after:content-[' '] after:absolute"}>
          {item.title}
        </Link>
        <ul className="flex flex-wrap gap-2 my-3">
          <IconText icon={CalendarIcon} text={convertDate(item.deadline)} alt="Дата проведения" />
          <IconText
            icon={ClockIcon}
            text={convertMinutes(item.durationMin)}
            alt="Продолжительность"
          />
          <IconText icon={LightningIcon} iconPrimary text={item.points.toString()} alt="Баллы" />
          {item.place && <IconText icon={MarkerIcon} text={item.place} alt="Место проведения" />}
        </ul>
        <Button
          className="relative z-10 mt-auto"
          disabled={item.isEnrolled}
          appearance="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onRegisterClick();
          }}>
          {item.isEnrolled ? "Записан" : "Записаться"}
        </Button>
      </div>
    </li>
  );
};
