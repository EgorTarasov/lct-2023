export const MockEvents: EventDto.Item[] = [
  {
    id: 0,
    category: "education",
    title: "Книжный клуб",
    deadline: new Date(Date.now()),
    durationMin: 120,
    points: 12,
    location: "Синий зал главного корпуса",
    imgSrc: null
  },
  {
    id: 0,
    category: "sport",
    title: "Трекинговый поход",
    deadline: new Date(Date.now()),
    durationMin: 800,
    points: 45,
    location: "Национальный парк «Угра»",
    imgSrc: null
  },
  {
    id: 0,
    category: "charity",
    title: "Zero Waste День",
    deadline: new Date(Date.now()),
    durationMin: 75,
    points: 20,
    location: "Синий зал главного корпуса",
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
    location?: string;
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
  }

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
      durationMin: 0,
      points: 0,
      location: dto.place,
      imgSrc: null
    };
  };
}
