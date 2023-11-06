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
      textColor: string;
    }
  >
> = {
  art: {
    illustration: ArtEvent,
    locale: "Творчество",
    textColor: "text-event-art"
  },
  charity: {
    illustration: CharityEvent,
    locale: "Волонтёрство",
    textColor: "text-event-charity"
  },
  education: {
    illustration: EducationEvent,
    locale: "Обучение",
    textColor: "text-event-education"
  },
  sport: {
    illustration: SportEvent,
    locale: "Спорт",
    textColor: "text-event-sport"
  }
};

export const getEventMap = (type: EventDto.EventType) => {
  return EventCategoryMap[type];
};
