import { Button } from "@/ui";
import { Input } from "@/ui/Input";
import { FormEvent, useState } from "react";
import TelegramIcon from "@/assets/telegram.svg";
import { AuthService } from "@/stores/auth.service.ts";
import { AuthDto } from "api/models/auth.model.ts";
import { useNavigate } from "react-router-dom";
import { ThemeService } from "@/stores/theme.service.ts";
import { observer } from "mobx-react-lite";
import { MOCK_USER } from "@/constants/mocks";

export const Login = observer(() => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState<boolean>(false);
  const [authData, setAuthData] = useState<AuthDto.Login>(MOCK_USER);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setShowError(false);
    try {
      const isSuccess = await AuthService.login(authData.username, authData.password);
      if (isSuccess) {
        navigate("/");
      } else {
        setShowError(true);
      }
    } catch {
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (value: string) => {
    setAuthData({ ...authData, password: value });
  };

  const handleUsernameChange = (value: string) => {
    setAuthData({ ...authData, username: value });
  };
  return (
    <div className={"w-full h-full flex items-center justify-center"}>
      <div className={"w-[300px] p-5"}>
        <div className={"mb-5 w-full flex items-center justify-center"}>
          <img
            src={ThemeService.themeConfig?.logoUrl}
            alt={"Логотип"}
            className={"w-[200px] h-auto"}
          />
        </div>
        <div className={"h-5 flex"}>
          {showError && <span className={"text-error text-sm"}>Неверный логин или пароль</span>}
        </div>
        <form
          onSubmit={handleFormSubmit}
          aria-label="Два поля: почта и пароль, либо вход через Telegram"
          className={"flex flex-col gap-3"}>
          <Input
            disabled={isLoading}
            label={"Логин"}
            type="email"
            required
            aria-label={"Почта"}
            autoComplete={"email"}
            name={"email"}
            value={authData.username}
            error={showError}
            placeholder={"Введите почту"}
            onChange={handleUsernameChange}
          />
          <div className={"flex-col flex-end gap-1"}>
            <Input
              disabled={isLoading}
              label={"Пароль"}
              type={"password"}
              required
              autoComplete={"current-password"}
              name={"password"}
              value={authData.password}
              error={showError}
              aria-label={"Пароль"}
              placeholder={"Введите пароль"}
              onChange={handlePasswordChange}
            />
            <div className={"flex items-center gap-1 justify-end"}>
              <button
                type={"button"}
                aria-label={"Забыли пароль?"}
                className={
                  "text-text-primary/60 text-sm hover:text-text-primary transition-colors duration-200"
                }>
                Забыли пароль?
              </button>
            </div>
          </div>
          <Button disabled={isLoading} type="submit">
            Войти
          </Button>
          <Button
            disabled={isLoading}
            appearance={"secondary"}
            type={"button"}
            aria-label={"Вход через Telegram"}
            className={"flex items-center justify-center gap-1 text-text-primary/60"}>
            <TelegramIcon className={"w-5 h-5"} aria-hidden="true" /> Войти через Telegram
          </Button>
        </form>
      </div>
    </div>
  );
});
