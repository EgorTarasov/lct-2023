import { CourseEndpoint } from "api/endpoints/course.endpoint";
import { CourseDto } from "api/models/course.model";
import { makeAutoObservable } from "mobx";

export class AdminOnboardingPageViewModel {
  public uploadedFiles: File[] = [];
  public onboarding: CourseDto.AdminResult | null = null;

  constructor() {
    makeAutoObservable(this);
    void this.init();
  }

  private async init() {
    const res = await CourseEndpoint.onboarding();
    console.log(res);
    // this.onboarding = res;
  }

  public addFiles(file: File[]) {
    this.uploadedFiles = [...this.uploadedFiles, ...file];
  }

  public removeFile(file: File) {
    this.uploadedFiles = this.uploadedFiles.filter((f) => f !== file);
  }
}
