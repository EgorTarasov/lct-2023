import { FCVM } from "@/utils/fcvm";
import { MainPageViewModel } from "../main.vm";
import { HorizontalCarousel } from "@/components/swiper/HorizontalCarousel";

export const LearningSection: FCVM<MainPageViewModel> = ({ vm }) => {
  return (
    <section className="flex flex-col w-full">
      <div className="flex justify-between items-center mx-4 mt-6">
        <h2 className="font-medium text-xl">Обучение</h2>
        <button id="test1">-</button>
        <button id="test2">+</button>
      </div>
      <HorizontalCarousel
        slidesPerView={1}
        navigation={{
          nextEl: "#test2",
          prevEl: "#test1",
          enabled: true
        }}>
        <div className="h-[400px] bg-red-200 w-full">Test</div>
        <div className="h-[400px] bg-red-200 w-full">Test</div>
        <div className="h-[400px] bg-red-200 w-full">Test</div>
        <div className="h-[400px] bg-red-200 w-full">Test</div>
        <div className="h-[400px] bg-red-200 w-full">Test</div>
      </HorizontalCarousel>
    </section>
  );
};
