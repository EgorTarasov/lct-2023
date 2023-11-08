import { makeAutoObservable } from "mobx";

export class EmployeesPageViewModel {
  constructor() {
    makeAutoObservable(this);
  }
}
