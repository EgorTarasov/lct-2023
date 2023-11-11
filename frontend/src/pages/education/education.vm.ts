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
      courseId: string;
      course: CourseDto.Item;
    }
  | {
      view: "courseTask";
      courseId: string;
      taskId: string;
      taskTitle?: string;
      markdown: string;
    };

export type ViewType = EducationPageState extends { view: infer V } ? V : never;

export class EducationPageViewModel {
  private courses: CourseDto.Item[] | null = null;
  public pageState: EducationPageState = { view: "loading" };

  constructor(courseId?: string, taskId?: string) {
    console.log(courseId, taskId);
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
      const task = res.files.find((f) => f.id.toString() === taskId);
      if (!task) {
        window.location.href = "/education";
        return;
      }

      const markdown = await CourseEndpoint.getTask(task.path);
      this.pageState = { view: "courseTask", courseId: id, taskId, markdown, taskTitle: task.name };
    } else {
      this.pageState = { view: "course", courseId: id, course: CourseDto.convertDtoToItem(res) };
    }
  }

  dispose() {}
}
