import { makeAutoObservable } from "mobx";

export class TasksPageViewModel {
  constructor() {
    makeAutoObservable(this);
  }
}
