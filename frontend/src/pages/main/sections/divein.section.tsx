import { FCVM } from "@/utils/fcvm";
import { MainPageViewModel } from "../main.vm";
import { HorizontalCarousel } from "@/components/swiper/HorizontalCarousel";
import ChevronIcon from "@/assets/chevron2.svg";
import { IconButton } from "@/ui/IconButton";
import { useId } from "react";
import { Separator } from "@/ui/Separator";
import { observer } from "mobx-react-lite";
import { CourseCard } from "@/components/cards/course-card.widget";
import { arrayChunk } from "@/utils/arrayChunk";
import { TaskCard } from "@/components/cards/task-card.widget";

export const DiveinSection: FCVM<MainPageViewModel> = observer(({ vm }) => {
  const leftControlId = useId();
  const rightControlId = useId();

  if (!vm.tasks) return null;

  return (
    <section className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mx-4">
          <h2 className="font-medium text-xl">Мои задачи</h2>
          <div className="flex gap-2">
            <IconButton id={leftControlId} icon={() => <ChevronIcon className="rotate-180" />} />
            <IconButton id={rightControlId} icon={ChevronIcon} />
          </div>
        </div>
        <Separator className="my-3" />
      </div>
      <ul className="grid">
        {vm.tasks.length === 0 && (
          <div className="flex justify-center items-center w-full h-48">
            <p className="text-gray-500">Нет незаконченных задач 🤯</p>
          </div>
        )}
        <HorizontalCarousel
          spaceBetween={16}
          a11y={{
            prevSlideMessage: "Предыдущие задачи",
            nextSlideMessage: "Следующие задачи",
            containerMessage: "Список задач, 3 на страницу",
            firstSlideMessage: "Первая страница",
            lastSlideMessage: "Последняя страница"
          }}
          mousewheel={{
            forceToAxis: true
          }}
          keyboard={false}
          slidesPerView={1}
          navigation={{
            prevEl: `#${CSS.escape(leftControlId)}`,
            nextEl: `#${CSS.escape(rightControlId)}`,
            enabled: true
          }}>
          {arrayChunk(vm.tasks, 3).map((v, i) => (
            <div className="flex flex-col gap-3 my-1" key={i}>
              {v.map((course, j) => (
                <TaskCard key={j} item={course} />
              ))}
            </div>
          ))}
        </HorizontalCarousel>
      </ul>
    </section>
  );
});
