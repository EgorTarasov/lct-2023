import UserIcon from "@/assets/user.svg";
import { StaffDto } from "api/models/staff.model.ts";
import TelegramIcon from "@/assets/telegram-link.svg";
import EmailIcon from "@/assets/email.svg";
import PhoneIcon from "@/assets/phone.svg";

export const StaffCard: React.FC<StaffDto.User> = ({
  id,
  roles,
  fullName,
  phone,
  email,
  telegram
}) => {
  const formatPhoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;
  return (
    <article
      className="flex flex-col gap-4 p-4 bg-white rounded-lg border border-text-primary/20"
      aria-labelledby="Карточка сотрудника">
      <div className="flex gap-2 items-start">
        <UserIcon className="w-11 h-11 text-primary" aria-hidden="true" />
        <div className="flex-col gap-1">
          <div className="flex gap-2 items-center" aria-label="Роли сотрудника">
            {roles.map((role, index) => (
              <>
                {index !== 0 && <div className="w-1 h-1 bg-primary rounded-full not-sr-only" />}
                <span key={index} className="text-sm text-primary">
                  {role}
                </span>
              </>
            ))}
          </div>
          <p id="staffName" aria-label={"ФИО сотрудника"}>
            {fullName}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-0.5 text-sm" aria-label={`Контакты ${fullName}`}>
        <a
          aria-label={"Телефон"}
          href={formatPhoneHref}
          className={"break-all underline text-primary"}>
          <PhoneIcon className="w-4 h-4 inline-block mr-1" aria-hidden="true" />
          {phone}
        </a>
        <a
          href={`mailto:${email}`}
          aria-label={"Почта"}
          className="break-all underline text-primary">
          <EmailIcon className="w-4 h-4 inline-block mr-1" aria-hidden="true" />
          {email}
        </a>
        <a
          aria-label={"Телеграм"}
          href={`${telegram.replace("@", "https://t.me/")}`}
          className={"break-all underline text-primary"}>
          <TelegramIcon className="w-4 h-4 inline-block mr-1" aria-hidden="true" />
          {telegram}
        </a>
      </div>
    </article>
  );
};
