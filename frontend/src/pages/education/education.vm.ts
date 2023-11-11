import { CourseEndpoint } from "api/endpoints/course.endpoint";
import { CourseDto } from "api/models/course.model";
import { makeAutoObservable } from "mobx";

export type EducationPageState =
  | {
      view: "loading";
    }
  | {
      view: "all";
      courses: CourseDto.Item[];
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
  private courses: CourseDto.Item[] | null = null;
  public pageState: EducationPageState = { view: "loading" };

  constructor() {
    console.log("render constructor");
    makeAutoObservable(this);
  }

  public async load() {
    if (this.courses === null) {
      const res = await CourseEndpoint.current();
      this.courses = res.map(CourseDto.convertDtoToItem);
    }
    this.pageState = { view: "all", courses: this.courses };
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
