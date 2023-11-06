import { CourseDto, MockCourses } from "api/models/course.model";
import { EventDto, MockEvents } from "api/models/event.model";
import { MockTasks, TaskDto } from "api/models/task.model";
import { makeAutoObservable } from "mobx";

export class MainPageViewModel {
  public events: EventDto.Item[] | null = MockEvents;
  public courses: CourseDto.Item[] | null = MockCourses;
  public tasks: TaskDto.Item[] | null = MockTasks;

  constructor() {
    makeAutoObservable(this);
  }
}
