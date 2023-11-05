import { withAuth } from "@/hoc/PrivateRoute";
import { ComponentType } from "react";
import { Login, MainPage, ResetPassword } from "../pages";

export interface RouteType {
  path: string;
  component: ComponentType;
  title: string;
}

export const privateRoutes = [
  {
    path: "/",
    component: withAuth(MainPage),
    title: "Главная"
  },
  {
    path: "/tasks",
    component: withAuth(MainPage),
    title: "Задания"
  },
  {
    path: "/events",
    component: withAuth(MainPage),
    title: "События"
  },
  {
    path: "/me",
    component: withAuth(MainPage),
    title: "Профиль"
  },
  {
    path: "/shop",
    component: withAuth(MainPage),
    title: "Магазин"
  },
  {
    path: "/contacts",
    component: withAuth(MainPage),
    title: "Контакты"
  }
];

export const routes: RouteType[] = [
  ...privateRoutes,
  {
    path: "/login",
    component: Login,
    title: "Вход"
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    title: "Восстановление пароля"
  }
];
