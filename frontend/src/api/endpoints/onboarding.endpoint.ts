import { CourseDto } from "api/models/course.model";
import api from "api/utils/api";

export namespace OnboardingEndpoint {
  export const current = async () => {
    return await api.get<CourseDto.Result>("/api/course/onboarding");
  };
}
