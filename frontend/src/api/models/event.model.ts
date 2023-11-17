export const MockEvents: EventDto.Item[] = [
  {
    id: 0,
    category: "education",
    title: "Книжный клуб",
    deadline: new Date(Date.now()),
    durationMin: 120,
    points: 12,
    place: "Синий зал главного корпуса",
    imgSrc: null
  },
  {
    id: 0,
    category: "sport",
    title: "Трекинговый поход",
    deadline: new Date(Date.now()),
    durationMin: 800,
    points: 45,
    place: "Национальный парк «Угра»",
    imgSrc: null
  },
  {
    id: 0,
    category: "charity",
    title: "Zero Waste День",
    deadline: new Date(Date.now()),
    durationMin: 75,
    points: 20,
    place: "Синий зал главного корпуса",
    imgSrc: null
  }
];

export namespace EventDto {
  export type EventType = "education" | "art" | "charity" | "sport";

  export interface Item {
    id: number;
    category: EventType;
    title: string;
    deadline: Date;
    durationMin: number;
    points: number;
    place: string;
    isEnrolled?: boolean;
    imgSrc: string | null;
  }

  export interface Result {
    title: string;
    place: string;
    type_id: number;
    starts_at: string;
    id: number;
    is_enrolled: boolean;
    event_type: {
      id: number;
      name: string;
    };
    duration: number;
  }

  export const getRussianCategory = (category: EventType): string => {
    return (
      {
        sport: "Спорт",
        education: "Образование",
        charity: "Благотворительность",
        art: "Искусство"
      } as Record<EventType, string>
    )[category];
  };

  export const convertDtoToItem = (dto: Result): Item => {
    return {
      id: dto.id,
      category: (
        {
          1: "sport",
          2: "education",
          3: "charity",
          4: "art"
        } as Record<number, EventType>
      )[dto.type_id],
      title: dto.title,
      deadline: new Date(dto.starts_at),
      durationMin: dto.duration,
      points: 0,
      place: dto.place,
      imgSrc: null,
      isEnrolled: dto.is_enrolled
    };
  };

  export interface Template {
    title: string;
    place: string;
    type_id: number;
    starts_at: string; //date-time
    duration: number;
  }

  export interface BackendEventType {
    id: number;
    name: string;
  }
}
