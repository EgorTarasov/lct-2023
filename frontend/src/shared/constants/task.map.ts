import { TaskDto } from "api/models/task.model";

export const getTaskMap = (type: TaskDto.TaskType): { textColor: string; locale: string } => {
  switch (type) {
    case "Обучение":
      return {
        textColor: "text-task-education",
        locale: "Обучение"
      };
    case "Адаптация":
      return {
        textColor: "text-task-divein",
        locale: "Погружение"
      };
    case "Мероприятие":
      return {
        textColor: "text-task-event",
        locale: "Мероприятие"
      };
    case "Собрание":
      return {
        textColor: "text-task-meeting",
        locale: "Встреча"
      };
    case "Работа":
      return {
        textColor: "text-task-work",
        locale: "Работа"
      };
    default:
      return {
        textColor: "text-task-education",
        locale: "Обучение"
      };
  }
};
