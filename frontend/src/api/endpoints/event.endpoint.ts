import { EventDto } from "api/models/event.model";
import api from "api/utils/api";

export namespace EventEndpoint {
  export const current = async () => {
    return await api.get<EventDto.Result[]>("/api/event/my");
  };
}
