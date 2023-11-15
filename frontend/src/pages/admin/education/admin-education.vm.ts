import { makeAutoObservable, runInAction } from "mobx";
import { CourseDto } from "api/models/course.model.ts";
import { CourseEndpoint } from "api/endpoints/course.endpoint.ts";

export class AdminEducationViewModel {
  courses: CourseDto.Item[] = [];
  isLoading = true;
  query = "";

  constructor() {
    makeAutoObservable(this);
    void this._init();
  }

  get filteredCourses(): CourseDto.Item[] {
    return this.courses.filter((course) => {
      if (!this.query) return true;
      return course.title.toLowerCase().includes(this.query.toLowerCase());
    });
  }

  createCourse = async (course: CourseDto.Template) => {
    const res = await CourseEndpoint.create(course);
    await this._init();
  };

  removeCourse = async (courseId: number) => {
    const res = await CourseEndpoint.remove(courseId);
    await this._init();
  };

  updateCourse = async (id: number, course: CourseDto.Template) => {
    // const res = await CourseEndpoint.update(id, course);
    await this._init();
  };

  private async _init() {
    await runInAction(async () => {
      const res = await CourseEndpoint.getAll();
      this.courses = res.map((course) => CourseDto.convertDtoToItem(course));
    });
    this.isLoading = false;
  }
}
