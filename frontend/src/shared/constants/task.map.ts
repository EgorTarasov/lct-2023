import { TaskDto } from "api/models/task.model";

const TaskCategoryMap: Readonly<
  Record<
    TaskDto.TaskType,
    {
      locale: string;
    }
  >
> = {
  education: {
    locale: "Обучение"
  },
  divein: {
    locale: "Погружение"
  },
  event: {
    locale: "Мероприятие"
  },
  meeting: {
    locale: "Встреча"
  },
  work: {
    locale: "Работа"
  }
};

export const getTaskMap = (type: TaskDto.TaskType) => TaskCategoryMap[type];
