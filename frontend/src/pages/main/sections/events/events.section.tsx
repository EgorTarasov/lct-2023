import { FCVM } from "@/utils/fcvm";
import { MainPageViewModel } from "../../main.vm";
import { Separator } from "@/ui/Separator";
import ChevronIcon from "@/assets/chevron2.svg";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { HorizontalCarousel } from "@/components/swiper/HorizontalCarousel";
import { EventCard } from "@/components/cards/event-card.widget";

export const EventsSection: FCVM<MainPageViewModel> = observer(({ vm }) => {
  if (!vm.events) return null;

  return (
    <section className="flex flex-col w-full">
      <div className="flex justify-between items-center mx-4">
        <h2 className="font-medium text-xl">Мероприятия</h2>
        <Link
          to="/events"
          className="flex transition-colors items-center text-text-primary/60 hover:text-text-primary font-medium">
          Все <ChevronIcon aria-hidden="true" />
        </Link>
      </div>
      <Separator className="my-3" />
      <ul className="grid">
        {vm.events.length === 0 ? (
          <div className="flex justify-center items-center w-full h-48">
            <p className="text-gray-500">Нет новых мероприятий 😭</p>
          </div>
        ) : (
          <HorizontalCarousel
            mousewheel={{
              forceToAxis: true
            }}>
            {vm.events.map((v, i) => (
              <EventCard key={i} item={v} onRegisterClick={() => vm.registerEvent(v.id)} />
            ))}
          </HorizontalCarousel>
        )}
      </ul>
    </section>
  );
});
