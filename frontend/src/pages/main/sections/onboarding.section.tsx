import { FCVM } from "@/utils/fcvm";
import { MainPageViewModel } from "../main.vm";
import Collapsible from "@/ui/Collapsible.tsx";
import Chevron from "@/assets/chevron2.svg";
import { Link, NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import CheckOn from "@/assets/check-on.svg";
import CheckOff from "@/assets/check-off.svg";
import { Checkbox } from "@/ui";

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
  const statusText = `Задача ${x.title},${x.isCompleted ? " не" : ""} пройденная`;

  return (
    <Link
      to={x.link}
      className={twMerge(
        "flex items-center justify-between w-full h-full relative py-2 px-4 transition-colors hover:bg-text-primary/5",
        "after:inset-0 after:content-[' '] after:absolute"
      )}
      aria-label={statusText}>
      <div className="flex items-center gap-2" aria-hidden="true">
        <Checkbox disabled checked={x.isCompleted} />
        <span className={twMerge("text-sm", x.isCompleted && "opacity-60")}>{x.title}</span>
      </div>
      <Chevron width={24} className="transform90" aria-hidden="true" />
    </Link>
  );
};
