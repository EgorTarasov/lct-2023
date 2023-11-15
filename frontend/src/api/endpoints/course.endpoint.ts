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

  export const uploadFilesByPositionId = async (positionId: number, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    return await api.post<CourseDto.CourseFile[]>(
      `/api/user/position/${positionId}/file`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
  };

  export const deleteCourseFromPosition = async (positionId: number, courseId: number) => {
    return await api.delete(`/api/user/position/${positionId}/course?course_id=${courseId}`);
  };

  export const addCourseToPosition = async (positionId: number, courseId: number) => {
    return await api.post(`/api/user/position/${positionId}/course?course_id=${courseId}`);
  };

  export const create = async (x: CourseDto.Template) => {
    const formData = new FormData();
    x.data.forEach((file) => formData.append("data", file));
    const query = new URLSearchParams();
    query.set("name", x.name);
    query.set("duration", x.duration.toString());
    return await api.post<CourseDto.Result>(
      `/api/course/?name=${x.name}&duration=${x.duration}`,
      x.data.length > 0 ? formData : undefined,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
  };

  export const remove = async (courseId: number) => {
    return await api.delete(`/api/course/${courseId}`);
  };

  export const update = async (courseId: number, course: CourseDto.Result) => {
    return await api.put<CourseDto.Result>(`/api/course/${courseId}`, course);
  };

  export const getQuiz = async (id: number) => {
    return await api.get<CourseDto.QuizFull>(`/api/quiz/quiz/${id}`);
  };

  export const checkAnswer = async (id: number, answer: string) => {
    return await api.post<{ is_correct: boolean }>(`/api/quiz/question/${id}`, answer);
  };
}
