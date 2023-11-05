import { EventCard } from "../main/sections/events/event-card.widget.tsx";
import { MockEvents } from "api/models/event.model.ts";

export const EventsPage = () => {
  return (
    <div>
      <div
        className={
          "flex flex-col bg-yellow-400 w-full h-full items-center justify-center text-black"
        }>
        <code>⚒️ WORK IN PROGRESS ⚒️</code>
      </div>
      <ul className="flex-col justify-between items-center mx-4 mt-6 gap-4">
        {MockEvents.map((v, i) => (
          <EventCard item={v} onRegisterClick={() => console.log(v.id)} key={v.id} wide />
        ))}
      </ul>
    </div>
  );
};
