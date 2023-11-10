import { TaskDto } from "api/models/task.model";
import api from "api/utils/api";

export namespace TasksEndpoint {
  export const current = async () => {
    return await api.get<TaskDto.Result[]>("/api/task/my");
  };
}
