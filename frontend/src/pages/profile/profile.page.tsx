import { useState } from "react";
import { ProfilePageViewModel } from "./profile.vm";
import { Loading } from "@/components/loading/Loading";
import { twMerge } from "tailwind-merge";
import TelegramIcon from "./assets/telegram.svg";
import EmailIcon from "./assets/email.svg";
import PhoneIcon from "./assets/phone.svg";
import Avatar from "./assets/avatar.svg";
import { observer } from "mobx-react-lite";
import { StaffCard } from "../staff/components/StaffCard";
import { Button, Chip, Input } from "@/ui";
import Collapsible from "@/ui/Collapsible";
import { EventCard } from "@/components/cards/event-card.widget";

const contactCard =
  "flex items-center gap-2 p-3 border border-text-primary/20 rounded-lg bg-white text-sm overflow-hidden";

export const ProfilePage = observer(() => {
  const [vm] = useState(() => new ProfilePageViewModel());

  if (vm.user === null) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  const mentor = vm.user.mentors[0];

  return (
    <div className="flex flex-col gap-4 px-4 mx-auto max-w-screen-desktop mt-6 sm:mt-10">
      <div className="flex flex-col gap-4 sm:bg-white sm:p-5 sm:rounded-2xl">
        <div className="flex items-center gap-2">
          <div className="w-16 h-16 border border-primary rounded-xl overflow-hidden">
            <Avatar />
          </div>
          <div className="flex flex-col">
            <span className="text-primary capitalize">{vm.user.adaptation_target}</span>
            <h3 className="text-2xl font-medium">{`${vm.user.last_name} ${vm.user.first_name} ${vm.user.middle_name}`}</h3>
          </div>
        </div>
        <ul
          className="grid gap items-center gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(128px, 1fr))"
          }}>
          <li className={twMerge(contactCard)}>
            <PhoneIcon className="w-4 h-4 min-w-[16px] min-h-[16px]" />
            <a className="text-ellipsis overflow-hidden" href={`tel:${vm.user.number}`}>
              {vm.user.number}
            </a>
          </li>
          <li className={twMerge(contactCard)}>
            <EmailIcon className="w-4 h-4 min-w-[16px] min-h-[16px]" />
            <a className="text-ellipsis overflow-hidden" href={`mailto:${vm.user.email}`}>
              {vm.user.email}
            </a>
          </li>
          {vm.user.telegram?.username && (
            <li className={twMerge(contactCard)}>
              <TelegramIcon className="w-4 h-4 min-w-[16px] min-h-[16px]" />
              <a
                className="text-ellipsis overflow-hidden"
                href={`https://t.me/${vm.user.telegram.username.replace("@", "")}`}>
                {vm.user.telegram.username}
              </a>
            </li>
          )}
        </ul>
        <Button
          className="h-[45px] items-center flex bg-[#2AABEE] text-white gap-1"
          onClick={() => vm.connectTelegram()}>
          <TelegramIcon className="min-w-[24px] min-h-[24px]" /> Подключить телеграм
        </Button>
        {mentor && (
          <div className="flex flex-col gap-3">
            <h4 className="text-lg">Мой лид</h4>
            <StaffCard
              email={mentor.email}
              id={mentor.id.toString()}
              phone={mentor.number}
              roles={[mentor.user_role.name]}
              telegram="@belova_designer"
              fullName={`${mentor.last_name} ${mentor.first_name} ${mentor.middle_name}`}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <h3 className="text-2xl">Мои интересы</h3>
        <div className="flex flex-wrap gap-2 mt-3">
          <Chip title="Творчество" />
          <Chip title="Спорт" />
          <Chip title="Волонтёрство" />
          <Chip title="Дополнительное обучение" />
        </div>
        <h4 className="my-3">Интересные факты обо мне</h4>
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            vm.updateFact();
          }}>
          <div
            className="grid gap items-center gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))"
            }}>
            <Input
              label="Вопрос обо мне"
              placeholder="Какой у меня любимый цвет?"
              value={vm.factQuestion}
              onChange={(v) => (vm.factQuestion = v)}
            />
            <Input
              label="Ответ"
              placeholder="Синий"
              value={vm.factAnswer}
              onChange={(v) => (vm.factAnswer = v)}
            />
          </div>
          {vm.factWasChanged && (
            <Button className="w-full mt-4" appearance="secondary" disabled={vm.factLoading}>
              Сохранить
            </Button>
          )}
        </form>
      </div>
      {vm.events && vm.events.length > 0 && (
        <Collapsible title="Регистрации на мероприятия">
          <ul
            className="grid gap items-center gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(128px, 1fr))"
            }}>
            {vm.events?.map((v, i) => (
              <EventCard item={v} onRegisterClick={() => vm.registerEvent(v.id)} key={v.id} wide />
            ))}
          </ul>
        </Collapsible>
      )}
      <Collapsible title="Мои достижения">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-xl font-bold text-center">В разработке</p>
          <p className="text-gray-500 text-center">Активно прорабатываем концепцию 🔬</p>
        </div>
      </Collapsible>
    </div>
  );
});
