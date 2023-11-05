import { withPrivateRoute } from "@/hoc/PrivateRoute";
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
    component: withPrivateRoute(MainPage),
    title: "Главная"
  },
  {
    path: "/tasks",
    component: withPrivateRoute(MainPage),
    title: "Задания"
  },
  {
    path: "/events",
    component: withPrivateRoute(MainPage),
    title: "События"
  },
  {
    path: "/me",
    component: withPrivateRoute(MainPage),
    title: "Профиль"
  },
  {
    path: "/shop",
    component: withPrivateRoute(MainPage),
    title: "Магазин"
  },
  {
    path: "/contacts",
    component: withPrivateRoute(MainPage),
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
