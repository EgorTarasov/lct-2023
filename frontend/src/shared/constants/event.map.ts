import { EventDto } from "api/models/event.model";
import SportEvent from "@/assets/moc/event/sport.svg";
import ArtEvent from "@/assets/moc/event/art.svg";
import CharityEvent from "@/assets/moc/event/charity.svg";
import EducationEvent from "@/assets/moc/event/education.svg";
import { HTMLProps } from "react";

const EventCategoryMap: Readonly<
  Record<
    EventDto.EventType,
    {
      illustration: React.FC<HTMLProps<SVGElement>>;
      locale: string;
    }
  >
> = {
  art: {
    illustration: ArtEvent,
    locale: "Творчество"
  },
  charity: {
    illustration: CharityEvent,
    locale: "Волонтёрство"
  },
  education: {
    illustration: EducationEvent,
    locale: "Обучение"
  },
  sport: {
    illustration: SportEvent,
    locale: "Спорт"
  }
};

export const getEventMap = (type: EventDto.EventType) => {
  return EventCategoryMap[type];
};
