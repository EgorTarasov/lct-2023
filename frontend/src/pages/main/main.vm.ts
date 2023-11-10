import { CourseEndpoint } from "api/endpoints/course.endpoint";
import { EventsEndpoint } from "api/endpoints/events.endpoint";
import { TasksEndpoint } from "api/endpoints/tasks.endpoint";
import { CourseDto, MockCourses } from "api/models/course.model";
import { EventDto, MockEvents } from "api/models/event.model";
import { MockTasks, TaskDto } from "api/models/task.model";
import { makeAutoObservable } from "mobx";

export class MainPageViewModel {
  public events: EventDto.Item[] | null = null;
  public courses: CourseDto.Item[] | null = null;
  public tasks: TaskDto.Item[] | null = null;

  constructor() {
    makeAutoObservable(this);
    void this.init();
  }

  private async init() {
    const [coursesRes, tasksRes, eventsRes] = await Promise.all([
      CourseEndpoint.current(),
      TasksEndpoint.current(),
      EventsEndpoint.current()
    ]);
    this.courses = coursesRes.map(CourseDto.convertDtoToItem);
    this.tasks = tasksRes.map(TaskDto.convertDtoToItem);
    this.events = eventsRes.map(EventDto.convertDtoToItem);
  }
}
