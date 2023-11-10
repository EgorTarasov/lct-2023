import { makeAutoObservable } from "mobx";

export class AdminOnboardingPageViewModel {
  public uploadedFiles: File[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public addFiles(file: File[]) {
    this.uploadedFiles = [...this.uploadedFiles, ...file];
  }

  public removeFile(file: File) {
    this.uploadedFiles = this.uploadedFiles.filter((f) => f !== file);
  }
}
