import { Button, DialogBase, IconText, Input } from "@/ui";
import { FormEvent, useMemo, useState } from "react";
import { EventDto } from "api/models/event.model.ts";
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
import { AdminEventsViewModel } from "./adminEvents.vm.ts";
import { observer } from "mobx-react-lite";
import { Loading } from "@/components/loading/Loading.tsx";

interface IAdminEventCardProps {
  item: EventDto.Item;
  vm: AdminEventsViewModel;
}

function formatTime(date: Date): string {
  // Get hours, minutes and seconds
  const hours: string = date.getHours().toString().padStart(2, "0");
  const minutes: string = date.getMinutes().toString().padStart(2, "0");
  const seconds: string = date.getSeconds().toString().padStart(2, "0");

  // Concatenate time in hh:mm:ss format
  return `${hours}:${minutes}:${seconds}`;
}

type CourseFormFields = "title" | "place" | "type_id" | "date" | "time" | "duration";
const AdminEventCard = (x: IAdminEventCardProps) => {
  const [selectedType, setSelectedType] = useState<EventDto.BackendEventType | null>(null);
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(x.item.deadline);
  const [isEditMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { locale, textColor } = useMemo(() => getEventMap(x.item.category), [x.item]);
  const ariaLabel = useMemo(
    () =>
      `Мероприятие ${x.item.title}, которое пройдет ${convertDate(x.item.deadline)} по адресу "${
        x.item.place
      }" и будет длиться ${convertMinutes(x.item.durationMin, true)}`,
    [x.item]
  );
  const handleUpdateEvent = async (e: FormEvent<HTMLFormElement>) => {
    if (!deadlineDate) return;
    const data = e.currentTarget.elements as unknown as Record<CourseFormFields, HTMLInputElement>;
    const timeParts = data.time.value.split(":");
    const date = new Date(deadlineDate);
    date.setHours(parseInt(timeParts[0]));
    date.setMinutes(parseInt(timeParts[1]));

    if (isNaN(Number(data.duration.value))) {
      return;
    }

    const template: EventDto.Template = {
      title: data.title.value,
      place: data.place.value,
      type_id: selectedType?.id ?? 1,
      starts_at: date.toISOString(),
      duration: Number(data.duration.value)
    };
    setIsLoading(true);
    try {
      await x.vm.updateEvent(x.item.id, template);
      setEditMode(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteEvent = () => {
    x.vm?.removeEvent(x.item.id);
    setEditMode(false);
  };

  return (
    <>
      <article
        className="flex flex-row h-full gap-4 p-4 bg-white rounded-2xl border border-text-primary/20 relative"
        aria-label={ariaLabel}>
        <div className="flex flex-col gap-2 w-full">
          <span className={`text-sm ${textColor}`}>{locale}</span>
          <h4 className="leading-5 text-lg max-w-[80%]">{x.item.title}</h4>
          <ul className="flex flex-wrap gap-2 items-center mt-auto">
            <IconText icon={CalendarIcon} alt="Дедлайн" text={convertDate(x.item.deadline)} />
            <IconText icon={ClockIcon} alt="Время выполнения" text={`${x.item.durationMin} мин`} />
            {/* <IconText
              icon={LightningIcon}
              alt="Баллы"
              text={x.item.points.toString()}
              iconPrimary
            /> */}
          </ul>
          {x.item.place && (
            <IconText icon={MarkerIcon} text={x.item.place} alt="Место проведения" />
          )}
        </div>
        <button
          className={"absolute top-3 right-3"}
          aria-label={"Удалить мероприятие"}
          onClick={() => {}}>
          <CloseSvg className={"w-6 h-6"} onClick={handleDeleteEvent} />
        </button>
        <button
          className={"absolute top-3 right-12"}
          aria-label={"Редактировать мероприятие"}
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
            defaultValue={
              "https://afisha.yandex.ru/moscow/art/smeshariki-iskusstvo-byt-kruglym?source=selection-events"
            }
          />
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label htmlFor="deadline" className="text-text-primary/60">
                День
              </label>
              <DatePicker
                aria-label="День проведения"
                id="deadline"
                selected={deadlineDate}
                onChange={(date) => setDeadlineDate(date)}
                placeholderText="1 января"
                className="rounded-lg px-3 py-2 mt-2 border broder-text-primary/20 w-28"
              />
            </div>
            <Input
              placeholder="Время проведения"
              required
              id="time"
              label={"Время"}
              step="1"
              type={"time"}
              defaultValue={formatTime(new Date(x.item.deadline))}
            />
            <Input
              placeholder="600"
              required
              id="duration"
              label={"Длительность (мин)"}
              type={"number"}
              defaultValue={x.item.durationMin.toString()}
            />
          </div>
          <Input
            placeholder="Место проведения"
            required
            id="place"
            label={"Место проведения"}
            defaultValue={x.item.place}
          />
          <DropdownMultiple<EventDto.BackendEventType | null>
            value={[selectedType]}
            options={x.vm.eventTypes}
            render={(option) => option?.name ?? "Не выбрано"}
            label="Категория"
            onChange={(value) => setSelectedType(value.at(-1) ?? null)}
          />
          <Button
            // className={
            //   "w-full bg-text-primary/5 rounded-lg py-3 text-text-primary/60 font-medium text-lg"
            // }
            disabled={isLoading}>
            Сохранить изменения
          </Button>
        </form>
      </DialogBase>
    </>
  );
};

export const AdminEventsPage = observer(() => {
  const [vm] = useState(() => new AdminEventsViewModel());
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedType, setSelectedType] = useState<EventDto.BackendEventType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateEvent = async (e: FormEvent<HTMLFormElement>) => {
    if (!deadlineDate) return;
    const data = e.currentTarget.elements as unknown as Record<CourseFormFields, HTMLInputElement>;
    const timeParts = data.time.value.split(":");
    const date = new Date(deadlineDate);
    date.setHours(parseInt(timeParts[0]));
    date.setMinutes(parseInt(timeParts[1]));
    if (isNaN(Number(data.duration.value))) return null;

    const template: EventDto.Template = {
      title: data.title.value,
      place: data.place.value,
      type_id: selectedType?.id ?? 1,
      starts_at: date.toISOString(),
      duration: Number(data.duration.value)
    };
    setIsLoading(true);
    try {
      await vm.createEvent(template);
      setShowCreateDialog(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (vm.isLoading) return <Loading />;
  return (
    <>
      <div className="appear flex flex-col gap-4 px-4 mx-auto mt-6 max-w-screen-desktop fade-enter-done sm:mt-10">
        <div className="flex-col item-center gap-4 sm:flex sm:flex-row sm:justify-between">
          <h1 className={"text-2xl font-medium sm:text-2xl"}>Все мероприятия</h1>
          <Button
            className="max-w-[233px]"
            onClick={() => setShowCreateDialog(true)}
            aria-label={"Добавить мероприятие"}>
            Добавить мероприятие
          </Button>
        </div>
        <Input
          className="max-w-xs"
          placeholder="Поиск по мероприятиям"
          value={vm.query}
          onChange={(v) => (vm.query = v)}
        />
        <ul
          className="grid gap items-center gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(256px, 1fr))"
          }}>
          {vm.filteredEvents.map((event, i) => (
            <AdminEventCard key={i} item={event} vm={vm} />
          ))}
        </ul>
      </div>
      <DialogBase
        isOpen={showCreateDialog}
        width={555}
        title="Новое мероприятие"
        onCancel={() => setShowCreateDialog(false)}
        confirmText="Добавить мероприятие">
        <form className="flex flex-col gap-4" onSubmit={handleCreateEvent}>
          <Input placeholder="Название мероприятия" required id="title" label={"Название"} />
          <Input placeholder="Ссылка на мероприятие" required id="link" label={"Ссылка"} />
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label htmlFor="deadline" className="text-text-primary/60">
                День
              </label>
              <DatePicker
                aria-label="День проведения"
                id="deadline"
                selected={deadlineDate}
                onChange={(date) => setDeadlineDate(date)}
                placeholderText="1 января"
                className="rounded-lg px-3 py-2 mt-2 border broder-text-primary/20 w-28"
              />
            </div>
            <Input
              placeholder="Время проведения"
              required
              id="time"
              label={"Время"}
              type={"time"}
            />
            <Input
              id="duration"
              placeholder="600"
              required
              label={"Длительность (мин)"}
              type={"number"}
            />
          </div>
          <Input
            placeholder="Место проведения"
            required
            id="place"
            label={"Место проведения"}
            defaultValue={""}
          />
          <DropdownMultiple<EventDto.BackendEventType>
            value={selectedType ? [selectedType] : []}
            onChange={(value) => setSelectedType(value.at(-1) ?? null)}
            options={vm.eventTypes}
            render={(option) => option.name}
            label={"Категория"}
          />
          <Button
            // className={
            //   "w-full bg-text-primary/5 rounded-lg py-3 text-text-primary/60 font-medium text-lg"
            // }
            disabled={isLoading}>
            Добавить мероприятие
          </Button>
        </form>
      </DialogBase>
    </>
  );
});
