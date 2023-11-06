import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "swiper/css/mousewheel";
import { A11y, Keyboard, Mousewheel, Navigation } from "swiper/modules";
import cl from "./swiper.module.scss";
import { FC, ReactNode } from "react";
import { A11yOptions, NavigationOptions, SwiperOptions } from "swiper/types";

interface HorizontalCarouselProps extends SwiperOptions {
  children: JSX.Element[];
}

export const HorizontalCarousel: FC<HorizontalCarouselProps> = ({
  children,
  slidesPerView,
  ...rest
}) => {
  return (
    <Swiper
      className={cl.swiper}
      spaceBetween={8}
      slidesPerView={slidesPerView ?? "auto"}
      keyboard
      mousewheel
      modules={[Mousewheel, Keyboard, A11y, Navigation]}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      {...rest}>
      {children.map((element, i) => (
        <SwiperSlide key={i}>{element}</SwiperSlide>
      ))}
    </Swiper>
  );
};
