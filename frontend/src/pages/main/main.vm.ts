import { CourseEndpoint } from "api/endpoints/course.endpoint";
import { CourseDto, MockCourses } from "api/models/course.model";
import { EventDto, MockEvents } from "api/models/event.model";
import { MockTasks, TaskDto } from "api/models/task.model";
import { makeAutoObservable } from "mobx";

export class MainPageViewModel {
  public events: EventDto.Item[] | null = MockEvents;
  public courses: CourseDto.Item[] | null = null;
  public tasks: TaskDto.Item[] | null = MockTasks;

  constructor() {
    makeAutoObservable(this);
    void this.init();
  }

  private async init() {
    const res = await CourseEndpoint.current();
    this.courses = res.map(CourseDto.convertDtoToItem);
  }
}
