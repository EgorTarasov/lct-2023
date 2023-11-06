import UserIcon from "@/assets/user.svg";
import { StaffDto } from "api/models/staff.model.ts";

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
      aria-labelledby="staffName">
      <div className="flex gap-2 items-start">
        <UserIcon className="w-11 h-11 text-primary" aria-hidden="true" />
        <div className="flex-col gap-1">
          <div className="flex gap-2 items-center" aria-label="Roles">
            {roles.map((role, index) => (
              <>
                {index !== 0 && <div className="w-1 h-1 bg-primary rounded-full not-sr-only" />}
                <span key={index} className="text-sm text-primary">
                  {role}
                </span>
              </>
            ))}
          </div>
          <p id="staffName">{fullName}</p>
        </div>
      </div>
      <div className="flex flex-col gap-0.5 text-sm">
        <a
          aria-label={`Телефон ${fullName}`}
          href={formatPhoneHref}
          className={"break-all underline text-primary"}>
          {phone}
        </a>
        <a
          href={`mailto:${email}`}
          aria-label={`Почта ${fullName}`}
          className="break-all underline text-primary">
          {email}
        </a>
        <a
          aria-label={`Телеграм ${fullName}`}
          href={`https://t.me/${telegram}`}
          className={"break-all underline text-primary"}>
          {telegram}
        </a>
      </div>
    </article>
  );
};
