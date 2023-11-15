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
    return await api.post<TaskDto.Result>("/api/task/", data);
  };

  export const remove = async (id: number) => {
    return await api.delete(`/api/task/${id}`);
  };

  export const update = async (id: number, data: TaskDto.Create) => {
    return await api.put<TaskDto.Result>(`/api/task/${id}`, data);
  };

  export const finishTask = async (id: number) => {
    return await api.put<TaskDto.Result>(`/api/task/update_status/${id}?task_status=Завершена`);
  };
}
