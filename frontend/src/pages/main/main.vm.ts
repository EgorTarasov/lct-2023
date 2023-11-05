import { makeAutoObservable } from "mobx";

export class MainPageViewModel {
  constructor() {
    makeAutoObservable(this);
  }
}
