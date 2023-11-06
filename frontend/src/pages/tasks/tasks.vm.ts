import { MockTasks, TaskDto } from "api/models/task.model";
import { makeAutoObservable } from "mobx";

export class TasksPageViewModel {
  public tasks: TaskDto.Item[] | null = MockTasks;

  constructor() {
    makeAutoObservable(this);
  }
}
