import { FCVM } from "@/utils/fcvm";
import { MainPageViewModel } from "../main.vm";
import Collapsible from "@/ui/Collapsible.tsx";
import Chevron from "@/assets/chevron2.svg";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import CheckOn from "@/assets/check-on.svg";
import CheckOff from "@/assets/check-off.svg";

interface IMocData {
  id: number;
  title: string;
  isCompleted: boolean;
  link: string;
}

const MocData: IMocData[] = [
  {
    id: 1,
    title: "Работа с презентациями",
    isCompleted: false,
    link: "tasks/how-to-present"
  },
  {
    id: 2,
    title: "Принципы дизайна Proscom",
    isCompleted: true,
    link: "/tasks/design-principles"
  }
];

export const OnBoardingSection: FCVM<MainPageViewModel> = (vm) => {
  return (
    <section className="flex flex-col" aria-label={"Список ваших задач по онбордингу"}>
      <Collapsible title={"Онбординг"}>
        <ul className="flex flex-col first:pt-0 first:pb-0">
          {MocData.map((item) => (
            <li key={item.id}>
              <SectionItem
                id={item.id}
                title={item.title}
                isCompleted={item.isCompleted}
                link={item.link}
              />
            </li>
          ))}
        </ul>
      </Collapsible>
    </section>
  );
};

const SectionItem = (x: IMocData) => {
  const statusText = x.isCompleted ? "Задача выполнена" : "Задача не выполнена";

  return (
    <article
      className={twMerge(
        "flex items-center justify-between w-full h-full py-2 px-4 transition-colors hover:bg-text-primary/5",
        x.isCompleted && "opacity-60"
      )}
      aria-label={statusText}>
      <div className="flex items-center gap-2" aria-hidden="true">
        {x.isCompleted ? <CheckOn width={24} /> : <CheckOff width={24} />}
        <span className="text-sm">{x.title}</span>
      </div>
      <NavLink to={x.link} aria-label={`Перейти к материалам по теме ${x.title}`}>
        <Chevron width={24} className="transform90" />
      </NavLink>
    </article>
  );
};
