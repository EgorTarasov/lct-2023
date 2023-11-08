import { makeAutoObservable } from "mobx";

export class AdminEducationViewModel {
  constructor() {
    makeAutoObservable(this);
  }
}
