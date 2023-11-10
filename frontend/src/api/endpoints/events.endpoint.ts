import { EventDto } from "api/models/event.model";
import api from "api/utils/api";

export namespace EventsEndpoint {
  export const current = async () => {
    return await api.get<EventDto.Result[]>("/api/event/my");
  };
}
