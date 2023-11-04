import { makeAutoObservable } from "mobx";

export class AuthServiceViewModel {
  constructor() {
    makeAutoObservable(this);
  }
}
