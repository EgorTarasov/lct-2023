import { TaskDto } from "api/models/task.model";
import api from "api/utils/api";

export namespace TasksEndpoint {
  export const current = async () => {
    return await api.get<TaskDto.Result[]>("/api/task/my");
  };

  /** Для получения задач для подопечного */
  export const getMenteeTasks = async (mentee_id: number) => {
    return await api.get<TaskDto.Result[]>(`/api/task/for-mentor/${mentee_id}`);
  };

  export const create = async (data: TaskDto.Create) => {
    return await api.post<TaskDto.Result>("/api/task", data);
  };
}
