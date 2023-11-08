import { makeAutoObservable } from "mobx";

export class AdminEventsViewModel {
  constructor() {
    makeAutoObservable(this);
  }
}
