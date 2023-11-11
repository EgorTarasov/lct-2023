import { OnboardingEndpoint } from "api/endpoints/onboarding.endpoint";
import { CourseDto } from "api/models/course.model";
import { makeAutoObservable } from "mobx";

export class OnboardingPageViewModel {
  public course: CourseDto.Item | null = null;
  public isLoading = true;
  constructor() {
    makeAutoObservable(this);
    void this.init();
  }

  private async init() {
    try {
      const course = await OnboardingEndpoint.current();
      this.course = CourseDto.convertDtoToItem(course);
    } finally {
      this.isLoading = false;
    }
  }
}
