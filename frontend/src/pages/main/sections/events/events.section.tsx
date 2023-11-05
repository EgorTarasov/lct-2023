import { FCVM } from "@/utils/fcvm";
import { MainPageViewModel } from "../../main.vm";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/a11y";
import { Separator } from "@/ui/Separator";
import ChevronIcon from "@/assets/chevron2.svg";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { EventCard } from "./event-card.widget";
import { Mousewheel } from "swiper/modules";
import cl from "./swiper.module.scss";

export const EventsSection: FCVM<MainPageViewModel> = observer(({ vm }) => {
  if (!vm.events) return null;

  return (
    <section className="flex flex-col w-full">
      <div className="flex justify-between items-center mx-3">
        <h2 className="font-medium text-xl">Мероприятия</h2>
        <Link
          to="/events"
          className="flex transition-colors items-center text-text-primary/60 hover:text-text-primary font-medium">
          Все <ChevronIcon aria-hidden="true" />
        </Link>
      </div>
      <Separator className="my-3" />
      <Swiper
        className={cl.swiper}
        slidesPerView="auto"
        mousewheel
        modules={[Mousewheel]}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}>
        <ul>
          {vm.events.map((v, i) => (
            <SwiperSlide key={i} className="ml-2">
              <EventCard item={v} onRegisterClick={() => console.log(v.id)} />
            </SwiperSlide>
          ))}
        </ul>
      </Swiper>
    </section>
  );
});
