import { HTMLProps } from "react";
import { CourseDto } from "api/models/course.model";
import WebinarIcon from "@/assets/course/webinar.svg";
import ArticleIcon from "@/assets/course/article.svg";
import ProgramIcon from "@/assets/course/program.svg";
import CourseIcon from "@/assets/course/course.svg";
import TestIcon from "@/assets/course/test.svg";
import BookIcon from "@/assets/course/book.svg";

const CourseCategoryMap: Readonly<
  Record<
    CourseDto.CourseType,
    {
      illustration: React.FC<HTMLProps<SVGElement>>;
      locale: string;
    }
  >
> = {
  webinar: {
    illustration: WebinarIcon,
    locale: "Вебинар"
  },
  article: {
    illustration: ArticleIcon,
    locale: "Статья"
  },
  program: {
    illustration: ProgramIcon,
    locale: "Программа"
  },
  course: {
    illustration: CourseIcon,
    locale: "Курс"
  },
  test: {
    illustration: TestIcon,
    locale: "Тест"
  },
  book: {
    illustration: BookIcon,
    locale: "Книга"
  }
};

export const getCourseMap = (type: CourseDto.CourseType) => {
  return CourseCategoryMap[type];
};
