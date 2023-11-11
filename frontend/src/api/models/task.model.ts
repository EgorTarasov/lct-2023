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
    menteeId: number;
    difficulty: number;
    status: TaskStatus;
    links: string[];
  }

  export interface Result {
    name: string;
    mentee_id: number;
    deadline: string;
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
      deadline: new Date(dto.deadline),
      type: dto.type as TaskType,
      isCompleted: dto.status === "Завершена",
      durationMin: dto.difficulty,
      points: dto.points,
      location: dto.place,
      imgSrc: null,
      menteeId: dto.mentee_id,
      difficulty: dto.difficulty,
      status: dto.status,
      links: dto.links
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
