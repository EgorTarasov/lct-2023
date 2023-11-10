export const MockTasks: TaskDto.Item[] = [
  {
    id: 0,
    type: "Мероприятие",
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
    type: "Адаптация",
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
    type: "Работа",
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
    type: "Обучение",
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
  export type TaskType = "Адаптация" | "Работа" | "Собрание" | "Мероприятие" | "Обучение";
  export type TaskStatus = "В процессе" | "Завершена";

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

  export interface Result {
    name: string;
    mentee_id: number;
    deadline: Date;
    status: TaskStatus;
    type: TaskType;
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

  export interface Create {
    name: string;
    mentee_id: number;
    deadline: string;
    status: TaskStatus;
    type: TaskType;
    difficulty: number;
    points: number;
    place: string;
    links: string[];
  }
}
