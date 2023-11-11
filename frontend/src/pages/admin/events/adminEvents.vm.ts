import { makeAutoObservable, runInAction } from "mobx";
import { EventDto } from "api/models/event.model.ts";
import { EventsEndpoint } from "api/endpoints/events.endpoint.ts";

export class AdminEventsViewModel {
  events: EventDto.Item[] = [];
  eventTypes: EventDto.BackendEventType[] = [];
  isLoading = true;
  query = "";

  constructor() {
    makeAutoObservable(this);
    void this._init();
  }

  get filteredEvents(): EventDto.Item[] {
    return this.events.filter((event) => {
      if (!this.query) return true;
      return event.title.toLowerCase().includes(this.query.toLowerCase());
    });
  }

  createEvent = async (course: EventDto.Template) => {
    const res = await EventsEndpoint.create(course);
    await this._init();
  };

  removeEvent = async (eventId: number) => {
    const res = await EventsEndpoint.remove(eventId);
    await this._init();
  };

  updateEvent = async (eventId: number, event: EventDto.Template) => {
    const res = await EventsEndpoint.update(eventId, event);
    await this._init();
  };

  private async _init() {
    await runInAction(async () => {
      const res = await EventsEndpoint.getAll();
      this.events = res.map((course) => EventDto.convertDtoToItem(course));
      this.eventTypes = await EventsEndpoint.getEventTypes();
    });
    this.isLoading = false;
  }
}
