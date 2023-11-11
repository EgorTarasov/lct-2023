import { TaskDto } from "api/models/task.model";
import { makeAutoObservable } from "mobx";

export class TasksPageViewModel {
  public tasks: TaskDto.Item[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }
}
