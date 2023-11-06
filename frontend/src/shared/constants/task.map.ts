import { TaskDto } from "api/models/task.model";

const TaskCategoryMap: Readonly<
  Record<
    TaskDto.TaskType,
    {
      locale: string;
      textColor: string;
    }
  >
> = {
  education: {
    textColor: "text-task-education",
    locale: "Обучение"
  },
  divein: {
    textColor: "text-task-divein",
    locale: "Погружение"
  },
  event: {
    textColor: "text-task-event",
    locale: "Мероприятие"
  },
  meeting: {
    textColor: "text-task-meeting",
    locale: "Встреча"
  },
  work: {
    textColor: "text-task-work",
    locale: "Работа"
  }
};

export const getTaskMap = (type: TaskDto.TaskType) => TaskCategoryMap[type];
