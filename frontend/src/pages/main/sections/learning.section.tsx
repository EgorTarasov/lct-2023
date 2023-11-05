import { FCVM } from "@/utils/fcvm";
import { MainPageViewModel } from "../main.vm";
import { HorizontalCarousel } from "@/components/swiper/HorizontalCarousel";
import ChevronIcon from "@/assets/chevron2.svg";
import { IconButton } from "@/ui/IconButton";
import { useId } from "react";
import { Separator } from "@/ui/Separator";

export const LearningSection: FCVM<MainPageViewModel> = ({ vm }) => {
  const leftControlId = useId();
  const rightControlId = useId();
  return (
    <section className="flex flex-col w-full">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mx-4 mt-6">
          <h2 className="font-medium text-xl">Обучение</h2>
          <div className="flex gap-2">
            <IconButton id={leftControlId} icon={() => <ChevronIcon className="rotate-180" />} />
            <IconButton id={rightControlId} icon={ChevronIcon} />
          </div>
        </div>
        <Separator className="my-3" />
      </div>
      <HorizontalCarousel
        slidesPerView={1}
        navigation={{
          nextEl: `#${leftControlId}`,
          prevEl: `#${rightControlId}`,
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
