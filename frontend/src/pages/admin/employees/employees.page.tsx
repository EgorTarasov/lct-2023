import DragDropFile from "@/components/gragAndDrop/index.tsc.tsx";
import { Button, IconText } from "@/ui";
import UserIcon from "@/assets/user.svg";
import PhoneIcon from "@/assets/phone.svg";
import EmailIcon from "@/assets/email.svg";
import TelegramIcon from "@/assets/telegram-link.svg";
import { CourseDto, MockCourses } from "api/models/course.model.ts";
import CalendarIcon from "@/assets/calendar.svg";
import { convertDate } from "@/utils/dateConverters.ts";
import ClockIcon from "@/assets/clock.svg";
import LightningIcon from "@/assets/lightning.svg";
import { useMemo } from "react";
import CloseSvg from "@/assets/clear.svg";
import EditSvg from "@/assets/edit.svg";

interface IAdminCourseCardProps {
  item: CourseDto.Item;
}

const AdminCourseCard = (x: IAdminCourseCardProps) => {
  const isDeadlineExpired = useMemo(() => x.item.deadline < new Date(), [x.item]);

  return (
    <ul className={"relative"}>
      <div className="flex flex-col gap-2 w-full border-t border-text-primary/20 py-3">
        <h4 className="leading-5 text-lg max-w-[80%]">{x.item.title}</h4>
        <li className="flex flex-wrap gap-2 items-center">
          <IconText icon={CalendarIcon} alt="Дедлайн" text={convertDate(x.item.deadline)} />
          <IconText
            icon={ClockIcon}
            alt="Время выполнения"
            text={`${x.item.timeEstimateMin} мин`}
          />
          <IconText icon={LightningIcon} alt="Баллы" text={x.item.points.toString()} iconPrimary />
        </li>
      </div>
      <button className={"absolute top-3 right-3"} aria-label={"Удалить задание"}>
        <CloseSvg className={"w-6 h-6"} />
      </button>
      <button className={"absolute top-3 right-9"} aria-label={"Редактировать задание"}>
        <EditSvg className={"w-6 h-6"} />
      </button>
    </ul>
  );
};
const MyHomues = () => {
  return (
    <article
      className="flex flex-col gap-4 p-4 bg-white rounded-lg border border-text-primary/20"
      aria-labelledby="Карточка сотрудника">
      <div className="flex gap-2 items-start">
        <UserIcon className="w-11 h-11 text-primary" aria-hidden="true" />
        <div className="flex-col gap-1">
          <div className="flex gap-2 items-center" aria-label="Роли сотрудника">
            {/*{roles.map((role, index) => (*/}
            {/*  <>*/}
            {/*    {index !== 0 && <div className="w-1 h-1 bg-primary rounded-full not-sr-only" />}*/}
            {/*    <span key={index} className="text-sm text-primary">*/}
            {/*      {role}*/}
            {/*    </span>*/}
            {/*  </>*/}
            {/*))}*/}
            <span className="text-sm text-primary">Мафиозник</span>
          </div>
          <p id="staffName" aria-label={"ФИО сотрудника"}>
            Зубенко Михаил Петрович
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-sm sm:flex-row sm:gap-4" aria-label={"Контакты "}>
        <a aria-label={"Телефон"} className={"break-all underline text-primary"}>
          <PhoneIcon className="w-4 h-4 inline-block mr-1" aria-hidden="true" />
          {"+7(999)999-99-99"}
        </a>
        <a href={"mailto:"} aria-label={"Почта"} className="break-all underline text-primary">
          <EmailIcon className="w-4 h-4 inline-block mr-1" aria-hidden="true" />
          zi@be.nko
        </a>
        <a aria-label={"Телеграм"} href={""} className={"break-all underline text-primary"}>
          <TelegramIcon className="w-4 h-4 inline-block mr-1" aria-hidden="true" />
          @zubenko
        </a>
      </div>
      <div className="flex-col">
        {MockCourses.slice(0, 3).map((v, i) => (
          <AdminCourseCard key={i} item={v} />
        ))}
      </div>
      <div className={"flex flex-col gap-4 sm:flex-row"}>
        <Button className={"max-w-[256px]"}>Добавить новое задание</Button>
        <Button className={"max-w-[256px]"}>Посмотреть прогресс</Button>
      </div>
    </article>
  );
};
export const EmployeesPage = () => {
  return (
    <div className="flex flex-col gap-4 px-4 mx-auto mt-6 max-w-screen-desktop fade-enter-done sm:mt-10">
      <h1 className={"text-2xl font-medium sm:text-2xl"}>Добавление сотрудников</h1>
      <section className="flex flex-col gap-4 mt-4">
        <DragDropFile
          onUpload={() => {}}
          acceptableFormats={[".cvc"]}
          dropZone={
            <p>
              Перетащите сюда или выберите <b>.csv</b> файл
            </p>
          }
        />
        <Button className={"max-w-[256px]"}>Добавить сотрудника вручную</Button>
      </section>
      <section className="flex flex-col gap-4 mt-4">
        <h2 className={"text-2xl font-medium sm:text-2xl"}>Мои сотрудники</h2>
        <MyHomues />
        <MyHomues />
      </section>
    </div>
  );
};
