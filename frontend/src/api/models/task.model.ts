export const MockTasks: TaskDto.Item[] = [
  {
    id: 0,
    title: "Дизайн-митап",
    date: new Date(Date.now()),
    durationMin: 120,
    points: 12,
    location: "Синий зал главного корпуса",
    imgSrc: null
  },
  {
    id: 0,
    title: "Караоке",
    date: new Date(Date.now()),
    durationMin: 125,
    points: 20,
    location: "Синий зал главного корпуса",
    imgSrc: null
  },
  {
    id: 0,
    title: "Донат ВС РФ",
    date: new Date(Date.now()),
    durationMin: 75,
    points: 20,
    location: "Синий зал главного корпуса",
    imgSrc: null
  }
];

export namespace TaskDto {
  export interface Item {
    id: number;
    title: string;
    date: Date;
    durationMin: number;
    points: number;
    location: string;
    imgSrc: string | null;
  }
}
