import { Button, DialogBase, IconText, Input } from "@/ui";
import { useMemo, useState } from "react";
import { EventDto, MockEvents } from "api/models/event.model.ts";
import CloseSvg from "@/assets/clear.svg";
import EditSvg from "@/assets/edit.svg";
import { convertDate, convertMinutes } from "@/utils/dateConverters.ts";
import CalendarIcon from "@/assets/calendar.svg";
import ClockIcon from "@/assets/clock.svg";
import LightningIcon from "@/assets/lightning.svg";
import MarkerIcon from "@/assets/marker.svg";
import { getEventMap } from "@/constants/event.map.ts";
import DatePicker from "react-datepicker";
import DropdownMultiple from "@/ui/DropdownMultiple.tsx";

interface IAdminEventCardProps {
  item: EventDto.Item;
}

const AdminEventCard = (x: IAdminEventCardProps) => {
  const [isEditMode, setEditMode] = useState(false);
  const { locale, textColor } = useMemo(() => getEventMap(x.item.category), [x.item]);
  const ariaLabel = useMemo(
    () =>
      `Мероприятие ${x.item.title}, которое пройдет ${convertDate(x.item.deadline)} по адресу "${
        x.item.location
      }" и будет длиться ${convertMinutes(x.item.durationMin, true)}`,
    [x.item]
  );
  const handleUpdateEvent = () => {
    console.log("update event");
    setEditMode(false);
  };
  const handleDeleteEvent = () => {
    console.log("delete event");
    setEditMode(false);
  };

  return (
    <>
      <article
        className="flex flex-row gap-4 p-4 bg-white rounded-2xl border border-text-primary/20 relative"
        aria-label={ariaLabel}>
        <div className="flex flex-col gap-2 w-full">
          <span className={`text-sm ${textColor}`}>{locale}</span>
          <h4 className="leading-5 text-lg max-w-[80%]">{x.item.title}</h4>
          <ul className="flex flex-wrap gap-2 items-center">
            <IconText icon={CalendarIcon} alt="Дедлайн" text={convertDate(x.item.deadline)} />
            <IconText
              icon={ClockIcon}
              alt="Время выполнения"
              text={x.item.durationMin.toString()}
            />
            <IconText
              icon={LightningIcon}
              alt="Баллы"
              text={x.item.points.toString()}
              iconPrimary
            />
          </ul>
          {x.item.location && (
            <IconText icon={MarkerIcon} text={x.item.location} alt="Место проведения" />
          )}
        </div>
        <button
          className={"absolute top-3 right-3"}
          aria-label={"Удалить задание"}
          onClick={() => {}}>
          <CloseSvg className={"w-6 h-6"} onClick={handleDeleteEvent} />
        </button>
        <button
          className={"absolute top-3 right-12"}
          aria-label={"Редактировать задание"}
          onClick={() => setEditMode(true)}>
          <EditSvg className={"w-6 h-6"} />
        </button>
      </article>
      <DialogBase
        isOpen={isEditMode}
        width={555}
        title="Редактирование мероприятия"
        onCancel={() => setEditMode(false)}
        confirmText="Сохранить изменения">
        <form className="flex flex-col gap-4" onSubmit={handleUpdateEvent}>
          <Input
            placeholder="Название мероприятия"
            required
            id="title"
            label={"Название"}
            defaultValue={x.item.title}
          />
          <Input
            placeholder="Ссылка на мероприятие"
            required
            id="link"
            label={"Ссылка"}
            defaultValue={x.item.title}
          />
          <DatePicker
            aria-label="Даты проведения"
            id="deadline"
            onChange={(date) => console.log(date)}
            placeholderText="1 января"
            className="rounded-lg px-3 py-2 mt-2 border broder-text-primary/20 w-28"
          />
          <Input
            placeholder="Место проведения"
            required
            id="location"
            label={"Место проведения"}
            defaultValue={x.item.location}
          />
          <DropdownMultiple
            label={"Категория"}
            options={["Спорт", "Обучение"]}
            value={["Спорт"]}
            onChange={function (value: string[]): void {
              throw new Error("Function not implemented.");
            }}
            render={(option) => "Спорт"}
          />
        </form>
      </DialogBase>
    </>
  );
};
export const AdminEventsPage = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-4 px-4 mx-auto mt-6 max-w-screen-desktop fade-enter-done sm:mt-10">
        <div className="flex-col item-center gap-4 sm:flex sm:flex-row sm:justify-between">
          <h1 className={"text-2xl font-medium sm:text-2xl"}>Все мероприятия</h1>
          <Button
            className="max-w-[233px]"
            onClick={() => setShowCreateDialog(true)}
            aria-label={"Добавить мероприятие"}>
            Добавить мероприятие
          </Button>
        </div>
        <Input placeholder="Поиск по мероприятиям" />
        <ul className="grid gap items-center gap-4 grid-cols-1 desktop:grid-cols-2">
          {MockEvents.map((event, i) => (
            <AdminEventCard key={i} item={event} />
          ))}
        </ul>
      </div>
      <DialogBase
        isOpen={showCreateDialog}
        width={555}
        title="Новое мероприятие"
        onCancel={() => setShowCreateDialog(false)}
        confirmText="Добавить мероприятие">
        <form className="flex flex-col gap-4">
          <Input placeholder="Название мероприятия" required id="title" label={"Название"} />
          <Input placeholder="Ссылка на мероприятие" required id="link" label={"Ссылка"} />
          <DatePicker
            aria-label="Даты проведения"
            id="deadline"
            onChange={(date) => console.log(date)}
            placeholderText="1 января"
            className="rounded-lg px-3 py-2 mt-2 border broder-text-primary/20 w-28"
          />
          <Input
            placeholder="Место проведения"
            required
            id="location"
            label={"Место проведения"}
            defaultValue={""}
          />
          <DropdownMultiple<EventDto.EventType>
            value={[]}
            onChange={function (value: EventDto.EventType[]): void {
              throw new Error("Function not implemented.");
            }}
            options={[]}
            render={(option) => EventDto.getRussianCategory(option)}
            label={"Категория"}
          />
        </form>
      </DialogBase>
    </>
  );
};
