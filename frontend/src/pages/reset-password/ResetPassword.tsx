import { PasswordField } from "@/components/fields/PasswordField";
import { useQuery } from "@/hooks/useQuery";
import { Button, Logo } from "@/ui";
import { Input } from "@/ui/Input";
import api from "api/utils/api";
import { FormEvent, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const token = useMemo(() => query.get("token"), [query]);

  const handleFormSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const { "new-password": newPassword, email } = e.target as typeof e.target & {
        "new-password"?: { value: string };
        email?: { value: string };
      };
      if (email?.value) {
        api
          .post(`/api/auth/send-recover-password?email=${email.value}`)
          .then(() => alert("Письмо отправлено!"));
      } else {
        api
          .post(`/api/auth/recover-password?token=${token}&new_password=${newPassword?.value}`)
          .then(() => {
            alert("Пароль успешно изменен!");
            navigate("/login");
          });
      }
    },
    [token]
  );

  return (
    <div className={"w-full h-full flex items-center justify-center bg-white"}>
      <div className={"w-[300px] p-5 flex flex-col"}>
        <div className="mb-5 w-full flex justify-center">
          <Logo />
        </div>
        <form onSubmit={handleFormSubmit} className="flex flex-col">
          {token ? (
            <PasswordField
              label="Новый пароль"
              autoComplete="new-password"
              placeholder="********"
              required
              name="new-password"
            />
          ) : (
            <Input
              label="Почта"
              required
              name="email"
              type="email"
              placeholder="name@company.com"
            />
          )}
          <Button className="mt-6">{token ? "Сменить пароль" : "Сбросить пароль"}</Button>
        </form>
        <Link
          to="/login"
          className="mt-3 w-full border h-10 flex items-center justify-center rounded-md">
          Вернуться к входу
        </Link>
      </div>
    </div>
  );
};
