import { Input, InputProps } from "@/ui/Input";
import { FC, useState } from "react";
import EyeOpenIcon from "./assets/eye-open.svg";
import EyeClosedIcon from "./assets/eye-closed.svg";

type PasswordField = Omit<InputProps, "type" | "icon" | "onIconClick">;

export const PasswordField: FC<PasswordField> = ({ ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Input
      onIconClick={() => setShowPassword((v) => !v)}
      rightIcon={
        showPassword ? (
          <EyeClosedIcon
            role={"button"}
            tabIndex={-1}
            type="button"
            title="Скрыть пароль"
            aria-label={"Скрыть пароль"}
          />
        ) : (
          <EyeOpenIcon
            role={"button"}
            title="Показать пароль"
            type="button"
            aria-label={"Показать пароль"}
          />
        )
      }
      type={showPassword ? "text" : "password"}
      {...rest}
    />
  );
};
