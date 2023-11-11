import { EventDto } from "api/models/event.model";
import api from "api/utils/api";

export namespace EventsEndpoint {
  export const current = async () => {
    return await api.get<EventDto.Result[]>("/api/event/my");
  };

  export const getAll = async () => {
    return await api.get<EventDto.Result[]>("/api/event/");
  };

  export const create = async (x: EventDto.Template) => {
    return await api.post("/api/event/", x);
  };

  export const remove = async (eventId: number) => {
    return await api.delete(`/api/event/${eventId}`);
  };

  export const update = async (eventId: number, x: EventDto.Template) => {
    return await api.put(`/api/event/${eventId}`, x);
  };

  export const enroll = async (eventId: number) => {
    return await api.post(`/api/event/enroll/${eventId}`);
  };

  export const getEventTypes = async () => {
    return await api.get<EventDto.BackendEventType[]>("/api/event/types");
  };
}
