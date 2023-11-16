import { makeAutoObservable } from "mobx";

export class ProfilePageViewModel {
  constructor() {
    makeAutoObservable(this);
  }
}
