import { CourseDto } from "api/models/course.model";
import api from "api/utils/api";

export namespace CourseEndpoint {
  export const current = async () => {
    return await api.get<CourseDto.Result[]>("/api/course/my");
  };

  export const getAll = async () => {
    return await api.get<CourseDto.Result[]>("/api/course/");
  };

  export const getQuizes = async () => {
    return await api.get<CourseDto.Quiz[]>("/api/quiz/all");
  };

  export const onboarding = async () => {
    return await api.get<CourseDto.AdminResult>("/api/course/onboarding");
  };

  export const get = async (id: string) => {
    return await api.get<CourseDto.Result>(`/api/course/id/${id}`);
  };

  export const submitOnboardingFiles = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    return await api.post<CourseDto.AdminResult>("/api/course/onboarding", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  };

  export const getTask = async (path: string) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/api/${path}`).then((res) => res.text());
  };

  export const getByPositionId = async (positionId: number) => {
    return await api.get<CourseDto.Result[]>(`/api/course/for-position/${positionId}`);
  };

  export const getFilesByPositionId = async (positionId: number) => {
    return await api.get<CourseDto.CourseFile[]>(`/api/user/position/${positionId}/file`);
  };

  export const deleteCourseFromPosition = async (positionId: number, courseId: number) => {
    return await api.delete(`/api/user/position/${positionId}/course?course_id=${courseId}`);
  };

  export const addCourseToPosition = async (positionId: number, courseId: number) => {
    return await api.post(`/api/user/position/${positionId}/course?course_id=${courseId}`);
  };

  export const getQuiz = async (id: number) => {
    return await api.get<CourseDto.QuizFull>(`/api/quiz/quiz/${id}`);
  };
}
