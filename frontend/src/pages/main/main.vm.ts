import { CourseDto, MockCourses } from "api/models/course.model";
import { EventDto, MockEvents } from "api/models/event.model";
import { makeAutoObservable } from "mobx";

export class MainPageViewModel {
  public events: EventDto.Item[] | null = MockEvents;
  public courses: CourseDto.Item[] | null = MockCourses;

  constructor() {
    makeAutoObservable(this);
  }
}
