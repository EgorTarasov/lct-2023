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
    isCompleted: false
  },
  {
    id: 0,
    type: "article",
    points: 12,
    timeEstimateMin: 5,
    progress: 70,
    deadline: subDays(new Date(), 3),
    title: "Статья",
    isCompleted: false
  },
  {
    id: 0,
    type: "program",
    points: 12,
    timeEstimateMin: 5,
    progress: 70,
    deadline: subDays(new Date(), 1),
    title: "Программа",
    isCompleted: true
  },
  {
    id: 0,
    type: "course",
    points: 12,
    timeEstimateMin: 5,
    progress: 70,
    deadline: subDays(new Date(), 5),
    title: "Курс по дизайну",
    isCompleted: false
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
  }
}
