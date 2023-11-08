import { makeAutoObservable } from "mobx";

export class AdminOnboardingViewModel {
  constructor() {
    makeAutoObservable(this);
  }
}
