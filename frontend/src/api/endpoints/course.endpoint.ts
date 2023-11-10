import { CourseDto } from "api/models/course.model";
import api from "api/utils/api";

export namespace CourseEndpoint {
  export const current = async () => {
    return await api.get<CourseDto.Result[]>("/api/course/my");
  };
}
