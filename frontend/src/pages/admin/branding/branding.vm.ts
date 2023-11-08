import { makeAutoObservable } from "mobx";

export class BrandingViewModel {
  constructor() {
    makeAutoObservable(this);
  }
}
