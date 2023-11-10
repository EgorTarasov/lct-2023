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
  },
  {
    id: 0,
    type: "education",
    title: "Как проектировать интерфейсы",
    isCompleted: false,
    deadline: new Date(),
    durationMin: 40,
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
  // "name": "string",
  // "mentee_id": 0,
  // "deadline": "2023-11-10T20:08:34.106Z",
  // "status": "В процессе",
  // "type": "Адаптация",
  // "difficulty": 0,
  // "points": 0,
  // "place": "string",
  // "links": [
  //   "string"
  // ],
  // "id": 0,
  // "mentor_id": 0,
  // "created_at": "2023-11-10T20:08:34.106Z",
  export interface Result {
    name: string;
    mentee_id: number;
    deadline: Date;
    status: string;
    type: string;
    difficulty: number;
    points: number;
    place: string;
    links: string[];
    id: number;
    mentor_id: number;
    created_at: Date;
  }

  export const convertDtoToItem = (dto: Result): Item => {
    return {
      id: dto.id,
      title: dto.name,
      deadline: dto.deadline,
      type: dto.type as TaskType,
      isCompleted: dto.status === "Завершена",
      durationMin: dto.difficulty,
      points: dto.points,
      location: dto.place,
      imgSrc: null
    };
  };
}
