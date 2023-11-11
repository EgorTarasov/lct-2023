import DragDropFile from "@/components/dragAndDrop/index.tsc";
import { Button, DialogBase, IconText, Input } from "@/ui";
import UserIcon from "@/assets/user.svg";
import PhoneIcon from "@/assets/phone.svg";
import EmailIcon from "@/assets/email.svg";
import TelegramIcon from "@/assets/telegram-link.svg";
import CalendarIcon from "@/assets/calendar.svg";
import { convertDate } from "@/utils/dateConverters.ts";
import ClockIcon from "@/assets/clock.svg";
import LightningIcon from "@/assets/lightning.svg";
import { FormEvent, useState } from "react";
import CloseSvg from "@/assets/clear.svg";
import EditSvg from "@/assets/edit.svg";
import { EmployeesPageViewModel } from "./employees.vm";
import DropdownMultiple from "@/ui/DropdownMultiple";
import { CommonDto } from "@/utils/common-dto";
import { observer } from "mobx-react-lite";
import { UserDto } from "api/models/user.model.ts";
import { TaskDto } from "api/models/task.model.ts";
import DatePicker from "react-datepicker";

interface IAdminCourseCard {
  item: TaskDto.Item;
  vm: EmployeesPageViewModel;
}

const AdminCourseCard = (x: IAdminCourseCard) => {
  const [editMode, setEditMode] = useState(false);
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(new Date(x.item.deadline));
  const handleRemoveTask = async (id: number) => {
    await x.vm.removeTask(id);
    x.vm.tasks = x.vm.tasks.map((v) => ({
      userId: v.userId,
      tasks: v.tasks.filter((x) => x.id !== id)
    }));
  };

  const handleUpdateTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = e.currentTarget.elements as unknown as Record<TaskFormFields, HTMLInputElement>;

    const template: TaskDto.Create = {
      name: data.title.value,
      mentee_id: x.item.menteeId,
      deadline: deadlineDate?.toISOString().split("T")[0] ?? "",
      status: x.item.status,
      type: x.item.type,
      difficulty: Number(data.time_estimate.value),
      points: Number(data.points.value),
      place: "",
      links: [data.task_link.value]
    };
    const result = await x.vm.updateTask(x.item.id, template);

    if (result) {
      setEditMode(false);
      x.vm.tasks = x.vm.tasks.map((v) => ({
        userId: v.userId,
        tasks: v.tasks.map((x) => (x.id === result.id ? TaskDto.convertDtoToItem(result) : x))
      }));
    }
  };
  return (
    <>
      <ul className={"relative"}>
        <div className="flex flex-col gap-2 w-full border-t border-text-primary/20 py-3">
          <h4 className="leading-5 text-lg max-w-[80%]">{x.item.title}</h4>
          <ul className="flex flex-wrap gap-2 items-center">
            <IconText icon={CalendarIcon} alt="Дедлайн" text={convertDate(x.item.deadline)} />
            <IconText icon={ClockIcon} alt="Время выполнения" text={`${x.item.difficulty} мин`} />
            <IconText
              icon={LightningIcon}
              alt="Баллы"
              text={x.item.points.toString()}
              iconPrimary
            />
          </ul>
        </div>
        <button
          className={"absolute top-3 right-3"}
          aria-label={"Удалить задание"}
          onClick={() => handleRemoveTask(x.item.id)}>
          <CloseSvg className={"w-6 h-6"} />
        </button>
        <button className={"absolute top-3 right-9"} aria-label={"Редактировать задание"}>
          <EditSvg className={"w-6 h-6"} onClick={() => setEditMode(true)} />
        </button>
      </ul>
      <DialogBase
        isOpen={editMode}
        width={555}
        title="Новое задание"
        onCancel={() => setEditMode(false)}
        confirmText="Добавить задание">
        <form className="flex flex-col gap-5" onSubmit={handleUpdateTask}>
          <Input
            id="title"
            label="Название"
            placeholder="Новое задание"
            required
            defaultValue={x.item.title}
          />
          <Input
            id="task_link"
            defaultValue={x.item.links[0]}
            label="Ссылка на описание"
            placeholder="https://example.com"
            required
          />
          <div className="flex gap-5 items-end">
            <div className="flex flex-col">
              <label htmlFor="deadline" className="text-text-primary/60">
                Дедлайн
              </label>
              <DatePicker
                id="deadline"
                selected={deadlineDate}
                onChange={(date) => setDeadlineDate(date)}
                placeholderText="1 января"
                className="rounded-lg px-3 py-2 mt-2 border broder-text-primary/20 w-28"
              />
            </div>
            <Input
              id="time_estimate"
              label="Трудозатратность (мин)"
              placeholder="60 мин"
              className="flex-1"
              defaultValue={x.item.difficulty.toString()}
              required
            />
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="points" className="text-text-primary/60">
                Баллы за выполнение
              </label>
              <div className="flex items-center gap-2">
                <LightningIcon className="text-text-primary w-6 min-w-[24px]" />
                <Input
                  id="points"
                  className="remove-arrow"
                  type="number"
                  required
                  defaultValue={x.item.points}
                />
              </div>
            </div>
          </div>
          <button
            className={
              "w-full bg-text-primary/5 rounded-lg py-3 text-text-primary/60 font-medium text-lg"
            }
            disabled={!deadlineDate}>
            Обновить задание
          </button>
        </form>
      </DialogBase>
    </>
  );
};

const MyHomues = observer(({ x, vm }: { x: UserDto.Item; vm: EmployeesPageViewModel }) => {
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);

  const handleCreateTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = e.currentTarget.elements as unknown as Record<TaskFormFields, HTMLInputElement>;

    const template: TaskDto.Create = {
      name: data.title.value,
      mentee_id: x.id,
      deadline: deadlineDate?.toISOString().split("T")[0] ?? "",
      status: "В процессе",
      type: "Адаптация",
      difficulty: Number(data.time_estimate.value),
      points: Number(data.points.value),
      place: "",
      links: [data.task_link.value]
    };
    const result = await vm.createTask(template);

    if (result) {
      setShowNewTaskDialog(false);
      vm.tasks.push({
        userId: x.id,
        tasks: [TaskDto.convertDtoToItem(result)]
      });
    }
  };

  return (
    <>
      <article
        className="flex flex-col gap-4 p-4 bg-white rounded-lg border border-text-primary/20"
        aria-labelledby="Карточка сотрудника">
        <div className="flex gap-2 items-start">
          <UserIcon className="w-11 h-11 text-primary" aria-hidden="true" />
          <div className="flex-col gap-1">
            <div className="flex gap-2 items-center" aria-label="Роли сотрудника">
              <span className="text-sm text-primary">{x.user_role.name}</span>
            </div>
            <p id="staffName" aria-label={"ФИО сотрудника"}>
              {x.last_name} {x.first_name} {x.middle_name}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm sm:flex-row sm:gap-4" aria-label={"Контакты "}>
          <a
            href={`"tel:${x.number}"`}
            aria-label={"Телефон"}
            className={"break-all underline text-primary"}>
            <PhoneIcon className="w-4 h-4 inline-block mr-1" aria-hidden="true" />
            {x.number}
          </a>
          <a
            href={`mailto:${x.email}`}
            aria-label={"Почта"}
            className="break-all underline text-primary">
            <EmailIcon className="w-4 h-4 inline-block mr-1" aria-hidden="true" />
            {x.email}
          </a>
          <a
            href={"https://t.me/zubenko"}
            aria-label={"Телеграм"}
            className={"break-all underline text-primary"}>
            <TelegramIcon className="w-4 h-4 inline-block mr-1" aria-hidden="true" />@
            {x.middle_name}
          </a>
        </div>
        <div className="flex-col">
          {vm.tasks &&
            vm.tasks
              .filter((v) => v.userId === x.id)
              .map((v, i) => v.tasks.map((x) => <AdminCourseCard item={x} vm={vm} key={x.id} />))}
        </div>
        <div className={"flex flex-col gap-4 sm:flex-row"}>
          <Button className={"max-w-[256px]"} onClick={() => setShowNewTaskDialog(true)}>
            Добавить задание
          </Button>
          <Button className={"max-w-[256px]"}>Посмотреть прогресс</Button>
        </div>
      </article>
      <DialogBase
        isOpen={showNewTaskDialog}
        width={555}
        title="Новое задание"
        onCancel={() => setShowNewTaskDialog(false)}
        confirmText="Добавить задание">
        <form className="flex flex-col gap-5" onSubmit={handleCreateTask}>
          <Input id="title" label="Название" placeholder="Новое задание" required />
          <Input
            id="task_link"
            label="Ссылка на описание"
            placeholder="https://example.com"
            required
          />
          <div className="flex gap-5 items-end">
            <div className="flex flex-col">
              <label htmlFor="deadline" className="text-text-primary/60">
                Дедлайн
              </label>
              <DatePicker
                id="deadline"
                selected={deadlineDate}
                onChange={(date) => setDeadlineDate(date)}
                placeholderText="1 января"
                className="rounded-lg px-3 py-2 mt-2 border broder-text-primary/20 w-28"
              />
            </div>
            <Input
              id="time_estimate"
              label="Трудозатратность (мин)"
              placeholder="60 мин"
              className="flex-1"
              required
            />
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="points" className="text-text-primary/60">
                Баллы за выполнение
              </label>
              <div className="flex items-center gap-2">
                <LightningIcon className="text-text-primary w-6 min-w-[24px]" />
                <Input id="points" className="remove-arrow" type="number" required />
              </div>
            </div>
          </div>
          <button
            className={
              "w-full bg-text-primary/5 rounded-lg py-3 text-text-primary/60 font-medium text-lg"
            }
            disabled={!deadlineDate}>
            Добавить задание
          </button>
        </form>
      </DialogBase>
    </>
  );
});

type UserFormFields = "first_name" | "last_name" | "middle_name" | "phone" | "email" | "goal";
type TaskFormFields = "title" | "task_link" | "time_estimate" | "points";

export const EmployeesPage = observer(() => {
  const [vm] = useState(() => new EmployeesPageViewModel());
  const [showNewUserDialog, setShowNewUserDialog] = useState(false);
  if (vm.isLoading) return <div>Загрузка...</div>;
  const handleCreateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = e.currentTarget.elements as unknown as Record<UserFormFields, HTMLInputElement>;

    const result = await vm.registerUser({
      first_name: data.first_name.value,
      last_name: data.last_name.value,
      middle_name: data.middle_name.value,
      phone: data.phone.value,
      email: data.email.value,
      goal: data.goal.value
    });

    if (result) {
      setShowNewUserDialog(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 px-4 mx-auto mt-6 max-w-screen-desktop fade-enter-done sm:mt-10">
        <h1 className={"text-2xl font-medium sm:text-2xl"}>Добавление сотрудников</h1>
        <section className="flex flex-col gap-4 mt-4">
          <DragDropFile
            onUpload={() => {}}
            acceptableFormats={[".csv"]}
            dropZone={
              <p>
                Перетащите сюда или выберите <b>.csv</b> файл
              </p>
            }
          />
          <Button className={"max-w-[256px]"} onClick={() => setShowNewUserDialog(true)}>
            Добавить сотрудника вручную
          </Button>
        </section>
        <section className="flex flex-col gap-4 mt-4">
          <h2 className={"text-2xl font-medium sm:text-2xl"}>Мои сотрудники</h2>
          {vm.mentees.map((x) => (
            <MyHomues x={x} vm={vm} key={x.id} />
          ))}
        </section>
      </div>
      <DialogBase
        isOpen={showNewUserDialog}
        width={555}
        title="Новый сотрудник"
        onCancel={() => setShowNewUserDialog(false)}
        confirmText="Добавить сотрудника">
        <form className="flex flex-col gap-5" onSubmit={handleCreateUser}>
          <div className="flex gap-5">
            <Input id="first_name" label="Имя" placeholder="Иван" required />
            <Input id="last_name" label="Фамилия" placeholder="Иванович" required />
            <Input id="middle_name" label="Отчество" placeholder="Иванов" />
          </div>
          <div className="flex gap-5 items-end">
            <Input
              className="flex-[0.47]"
              id="phone"
              type="tel"
              placeholder="+79199999999"
              label="Номер телефона"
            />
            <Input
              className="flex-1"
              id="email"
              type="email"
              placeholder="name@proscom.ru"
              label="Почта"
            />
          </div>
          <label className="text-text-primary/60">
            Цель адаптации
            <textarea
              id="goal"
              className="px-3 py-2 h-20 text-text-primary text-base border border-primary/20 rounded-lg w-full mt-3"
              placeholder="Актуализация/получение и закрепление навыков для выполнения должностных обязанностей."
            />
          </label>
          <DropdownMultiple<CommonDto.Named<number>>
            render={(v) => v.name}
            options={vm.positions}
            label="Должность"
            onChange={(v) => {
              vm.selectedPosition = v.at(-1) ?? null;
            }}
            value={vm.selectedPosition ? [vm.selectedPosition] : []}
          />
          <button
            className={
              "w-full bg-text-primary/5 rounded-lg py-3 text-text-primary/60 font-medium text-lg"
            }>
            Добавить сотрудника
          </button>
        </form>
      </DialogBase>
    </>
  );
});
