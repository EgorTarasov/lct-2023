// get token from query string, router-dom
import { PasswordField } from "@/components/fields/PasswordField";
import { useQuery } from "@/hooks/useQuery";
import { Button, Logo } from "@/ui";
import { Input } from "@/ui/Input";
import { FormEvent, useCallback, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

export const ResetPassword = () => {
  const query = useQuery();
  const token = useMemo(() => query.get("token"), [query]);

  const handleFormSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const { newPassword, email } = e.target as typeof e.target & {
        newPassword?: { value: string };
        email?: { value: string };
      };
      console.log(newPassword?.value, email?.value);
    },
    [token]
  );

  return (
    <div className={"w-full h-full flex items-center justify-center"}>
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
              name="new-password"
              id="newPassword"
            />
          ) : (
            <Input label="Почта" name="email" type="email" placeholder="name@company.com" />
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
