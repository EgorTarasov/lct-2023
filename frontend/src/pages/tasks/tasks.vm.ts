import { TasksEndpoint } from "api/endpoints/tasks.endpoint";
import { TaskDto } from "api/models/task.model";
import { makeAutoObservable } from "mobx";

export class TasksPageViewModel {
  public tasks: TaskDto.Item[] | null = null;

  constructor() {
    makeAutoObservable(this);
    void this.init();
  }

  async init() {
    const res = await TasksEndpoint.current();
    this.tasks = res.map((task) => TaskDto.convertDtoToItem(task));
  }

  async finishTask(taskId: number) {
    await TasksEndpoint.finishTask(taskId);
    await this.init();
  }
}
