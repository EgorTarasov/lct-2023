export const MockEvents: EventDto.Item[] = [
  {
    id: 0,
    category: "education",
    title: "Книжный клуб",
    date: new Date(Date.now()),
    durationMin: 120,
    points: 12,
    location: "Синий зал главного корпуса",
    imgSrc: null
  },
  {
    id: 0,
    category: "art",
    title: "Трекинговый поход",
    date: new Date(Date.now()),
    durationMin: 800,
    points: 45,
    location: "Национальный парк «Угра»",
    imgSrc: null
  },
  {
    id: 0,
    category: "charity",
    title: "Zero Waste День",
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
