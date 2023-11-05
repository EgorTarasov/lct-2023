import { EventDto, MockEvents } from "api/models/event.model";
import { makeAutoObservable } from "mobx";

export class MainPageViewModel {
  public events: EventDto.Item[] | null = MockEvents;
  constructor() {
    makeAutoObservable(this);
  }
}
