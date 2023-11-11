import { subDays } from "date-fns";

export const MockCourses: CourseDto.Item[] = [
  {
    id: 0,
    type: "webinar",
    points: 12,
    timeEstimateMin: 5,
    progress: 70,
    deadline: subDays(new Date(), 5),
    title: "Вебинар по деловым коммуникациям",
    isCompleted: false,
    files: [],
    quizes: []
  },
  {
    id: 0,
    type: "article",
    points: 12,
    timeEstimateMin: 5,
    progress: 70,
    deadline: subDays(new Date(), 3),
    title: "Статья",
    isCompleted: false,
    files: [],
    quizes: []
  },
  {
    id: 0,
    type: "program",
    points: 12,
    timeEstimateMin: 5,
    progress: 70,
    deadline: subDays(new Date(), 1),
    title: "Программа",
    isCompleted: true,
    files: [],
    quizes: []
  },
  {
    id: 0,
    type: "course",
    points: 12,
    timeEstimateMin: 5,
    progress: 70,
    deadline: subDays(new Date(), 5),
    title: "Курс по дизайну",
    isCompleted: false,
    files: [],
    quizes: []
  }
];

export namespace CourseDto {
  export type CourseType = "webinar" | "article" | "program" | "course" | "test" | "book";

  export interface Item {
    id: number;
    type: CourseType;
    points: number;
    timeEstimateMin: number;
    progress: number;
    deadline: Date;
    title: string;
    isCompleted: boolean;
    files: CourseFile[];
    quizes: Quiz[];
  }

  export interface Result {
    name: string;
    duration: number;
    id: number;
    quizes: Quiz[];
    files: CourseFile[];
  }

  /** Для создания курса */
  export interface Template {
    name: string;
    duration: number;
    data: File[];
  }

  export const convertDtoToItem = (dto: Result): Item => {
    return {
      id: dto.id,
      type: "course",
      points: 12,
      timeEstimateMin: 5,
      progress: 70,
      deadline: subDays(new Date(), 5),
      title: dto.name,
      isCompleted: false,
      files: dto.files,
      quizes: dto.quizes
    };
  };

  export interface CourseFile {
    name: string;
    path: string;
    id: number;
  }

  export interface Quiz {
    id: number;
    title: string;
    description_text: string;
  }

  export interface QuizFull {
    id: number;
    title: string;
    description_text: string;
    questions?: Question[];
    file: CourseFile;
  }

  export interface QuizLong {
    id: number;
    title: string;
    description_text: string;
    questions: Question[];
  }

  export interface Question {
    id: number;
    question_text: string;
    is_correct: boolean;
    options: QuestionOption[];
  }

  export interface QuestionOption {
    id: string;
    text: string;
  }

  export interface AdminResult {
    name: string;
    duration: number;
    id: number;
    quizes: Quiz[];
    files: CourseFile[];
  }
}
