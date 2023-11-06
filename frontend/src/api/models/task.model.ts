export const MockTasks: TaskDto.Item[] = [
  {
    id: 0,
    type: "divein",
    title: "Дизайн-митап",
    isCompleted: false,
    deadline: new Date(),
    durationMin: 120,
    points: 12,
    location: "Синий зал главного корпуса",
    imgSrc: null
  },
  {
    id: 0,
    type: "meeting",
    title: "Караоке",
    isCompleted: false,
    deadline: new Date(),
    durationMin: 125,
    points: 20,
    location: "Синий зал главного корпуса",
    imgSrc: null
  },
  {
    id: 0,
    type: "work",
    title: "Донат на твич",
    isCompleted: true,
    deadline: new Date(),
    durationMin: 75,
    points: 20,
    location: "Синий зал главного корпуса",
    imgSrc: null
  }
];

export namespace TaskDto {
  export type TaskType = "education" | "divein" | "event" | "meeting" | "work";

  export interface Item {
    id: number;
    title: string;
    deadline: Date;
    type: TaskType;
    isCompleted: boolean;
    durationMin: number;
    points: number;
    location: string;
    imgSrc: string | null;
  }
}
