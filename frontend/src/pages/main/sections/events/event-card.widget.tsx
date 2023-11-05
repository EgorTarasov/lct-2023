import { EventDto } from "api/models/event.model";
import { FC, HTMLProps, useMemo } from "react";
import { getEventMap } from "@/constants/event.map";
import { Button } from "@/ui";
// calendar, clock, lightning, marker
import ClockIcon from "@/assets/clock.svg";
import CalendarIcon from "@/assets/calendar.svg";
import LightningIcon from "@/assets/lightning.svg";
import MarkerIcon from "@/assets/marker.svg";
import { twMerge } from "tailwind-merge";
import { Link, useNavigate } from "react-router-dom";

interface EventCardProps {
  item: EventDto.Item;
  onRegisterClick: () => void;
}

const IconText = ({
  icon: Icon,
  text,
  alt,
  iconPrimary
}: {
  icon: React.FC<HTMLProps<SVGElement>>;
  text: string;
  alt: string;
  iconPrimary?: boolean;
}) => (
  <div className="flex" aria-label={alt}>
    <Icon
      className={twMerge("min-w-[16px]", iconPrimary ? "text-primary" : "text-text-primary/60")}
      aria-hidden="true"
      width={16}
      height={16}
    />
    <span className="ml-1 text-sm leading-none">{text}</span>
  </div>
);

const convertDate = (date: Date) => {
  // dd.mm в hh:mm
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month} в ${
    hours < 10 ? "0" + hours : hours
  }:${minutes < 10 ? "0" + minutes : minutes}`;
};

const convertMinutes = (minutes: number, screenReader?: boolean) => {
  // h ч m мин
  const hours = Math.floor(minutes / 60);
  const min = minutes % 60;
  const hoursText = screenReader ? "часов" : "ч";
  const minText = screenReader ? "минут" : "мин";

  const result = [`${hours} ${hoursText}`];
  if (min !== 0) {
    result.push(`${min} ${minText}`);
  }
  return result.join(" ");
};

export const EventCard: FC<EventCardProps> = ({ item, onRegisterClick }) => {
  const navigate = useNavigate();
  const { illustration: Icon, locale } = useMemo(() => getEventMap(item.category), [item]);
  const ariaLabel = useMemo(
    () =>
      `Открыть мероприятие ${item.title}, которое пройдет ${convertDate(item.date)} в ${
        item.location
      } и будет длиться ${convertMinutes(item.durationMin, true)}`,
    [item]
  );

  return (
    <div
      onClick={() => navigate(`/events/${item.id}`)}
      aria-label={ariaLabel}
      tabIndex={0}
      className="flex flex-col w-52 rounded-2xl border border-text-primary/20">
      <Icon className="text-primary" />
      <div className="flex flex-col m-4 mt-3" aria-hidden>
        <span className={`text-sm text-event-${item.category}`}>{locale}</span>
        <h4 className="text-lg leading-none">{item.title}</h4>
        <div className="flex flex-wrap gap-2 my-3">
          <IconText icon={CalendarIcon} text={convertDate(item.date)} alt="Дата проведения" />
          <IconText
            icon={ClockIcon}
            text={convertMinutes(item.durationMin)}
            alt="Продолжительность"
          />
          <IconText icon={LightningIcon} iconPrimary text={item.points.toString()} alt="Баллы" />
          <IconText icon={MarkerIcon} text={item.location} alt="Место проведения" />
        </div>
        <Button
          appearance="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onRegisterClick();
          }}>
          Записаться
        </Button>
      </div>
    </div>
  );
};