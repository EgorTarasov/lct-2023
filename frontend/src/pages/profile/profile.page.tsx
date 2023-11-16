import { useState } from "react";
import { ProfilePageViewModel } from "./profile.vm";
import { Loading } from "@/components/loading/Loading";
import { twMerge } from "tailwind-merge";
import TelegramIcon from "./assets/telegram.svg";
import EmailIcon from "./assets/email.svg";
import PhoneIcon from "./assets/phone.svg";
import Avatar from "./assets/avatar.svg";
import { observer } from "mobx-react-lite";

const contactCard =
  "flex items-center gap-2 p-3 border border-text-primary/20 rounded-lg bg-white text-sm";

export const ProfilePage = observer(() => {
  const [vm] = useState(() => new ProfilePageViewModel());

  if (vm.user === null) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:px-4 mx-auto max-w-screen-desktop mt-6 sm:mt-10">
      <div className="flex flex-col gap-4 sm:bg-white sm:p-5 sm:rounded-2xl">
        <div className="w-16 h-16 border border-primary rounded-xl overflow-hidden">
          <Avatar />
        </div>
        <ul
          className="grid gap items-center gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(128px, 1fr))"
          }}>
          <li className={twMerge(contactCard)}>
            <PhoneIcon className="w-4 h-4" />
            <a href={`tel:${vm.user.number}`}>{vm.user.number}</a>
          </li>
          <li className={twMerge(contactCard)}>
            <EmailIcon className="w-4 h-4" />
            <a href={`email:${vm.user.email}`}>{vm.user.email}</a>
          </li>
          {vm.user.telegram?.username && (
            <li className={twMerge(contactCard)}>
              <TelegramIcon className="w-4 h-4" />
              <a href={`tel:${vm.user.telegram}`}>{vm.user.telegram.username}</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
});
