import { CourseEndpoint } from "api/endpoints/course.endpoint";
import { CourseDto } from "api/models/course.model";
import { makeAutoObservable } from "mobx";

export type EducationPageState =
  | {
      view: "loading";
    }
  | {
      view: "all";
    }
  | {
      view: "course";
      id: string;
      course: CourseDto.Item;
    }
  | {
      view: "courseTask";
      id: string;
      taskId: string;
    };

export type ViewType = EducationPageState extends { view: infer V } ? V : never;

export class EducationPageViewModel {
  public courses: CourseDto.Item[] = [];
  public pageState: EducationPageState = { view: "loading" };

  constructor() {
    makeAutoObservable(this);
  }

  public async load() {
    const res = await CourseEndpoint.current();
    this.courses = res.map(CourseDto.convertDtoToItem);
    this.pageState = { view: "all" };
  }

  public async loadCourse(id: string, taskId?: string) {
    const res = await CourseEndpoint.get(id);
    if (taskId) {
      this.pageState = { view: "courseTask", id, taskId };
    } else {
      this.pageState = { view: "course", id, course: CourseDto.convertDtoToItem(res) };
    }
  }

  dispose() {}
}
