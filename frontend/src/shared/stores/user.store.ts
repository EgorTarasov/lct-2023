import { makeAutoObservable } from "mobx";

class UserStoreViewModel {
  public points = 100;

  constructor() {
    makeAutoObservable(this);
  }
}

export const UserStore = new UserStoreViewModel();
