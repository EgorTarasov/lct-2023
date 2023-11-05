export const MockEvents: EventDto.Item[] = [
  {
    id: 0,
    category: "education",
    title: "Дизайн-митап",
    date: new Date(Date.now()),
    durationMin: 120,
    points: 12,
    location: "Синий зал главного корпуса",
    imgSrc: null
  },
  {
    id: 0,
    category: "art",
    title: "Караоке",
    date: new Date(Date.now()),
    durationMin: 125,
    points: 20,
    location: "Синий зал главного корпуса",
    imgSrc: null
  },
  {
    id: 0,
    category: "charity",
    title: "Донат ВС РФ",
    date: new Date(Date.now()),
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
    date: Date;
    durationMin: number;
    points: number;
    location: string;
    imgSrc: string | null;
  }
}
