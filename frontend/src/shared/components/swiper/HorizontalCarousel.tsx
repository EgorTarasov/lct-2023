import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "swiper/css/mousewheel";
import { A11y, Keyboard, Mousewheel, Navigation } from "swiper/modules";
import cl from "./swiper.module.scss";
import { ReactNode } from "react";
import { NavigationOptions, SwiperOptions } from "swiper/types";

export const HorizontalCarousel = ({
  children,
  navigation,
  slidesPerView
}: {
  children: JSX.Element[];
  navigation?: NavigationOptions;
  slidesPerView?: SwiperOptions["slidesPerView"];
}) => {
  return (
    <Swiper
      className={cl.swiper}
      spaceBetween={8}
      slidesPerView={slidesPerView ?? "auto"}
      keyboard
      mousewheel
      modules={[Mousewheel, Keyboard, A11y, Navigation]}
      navigation={navigation}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}>
      {children.map((element, i) => (
        <SwiperSlide key={i}>{element}</SwiperSlide>
      ))}
    </Swiper>
  );
};
