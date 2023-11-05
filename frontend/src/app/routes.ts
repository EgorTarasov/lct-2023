import { withAuth } from "@/hoc/PrivateRoute";
import { ComponentType } from "react";
import { Login, MainPage, ResetPassword } from "../pages";
import { ProfilePage } from "../pages/profile/profile.page.tsx";

export interface RouteType {
  path: string;
  component: ComponentType;
  title: string;
  showInNav?: boolean;
}

export const routes: RouteType[] = [
  {
    path: "/",
    component: withAuth(MainPage),
    title: "Главная",
    showInNav: true
  },
  {
    path: "/tasks",
    component: withAuth(MainPage),
    title: "Задания",
    showInNav: true
  },
  {
    path: "tasks/:id",
    component: withAuth(MainPage),
    title: "Задания"
  },
  {
    path: "/events",
    component: withAuth(MainPage),
    title: "События",
    showInNav: true
  },
  {
    path: "/events/:id",
    component: withAuth(MainPage),
    title: "События",
    showInNav: true
  },
  {
    path: "/me",
    component: withAuth(ProfilePage),
    title: "Профиль",
    showInNav: true
  },
  {
    path: "/shop",
    component: withAuth(MainPage),
    title: "Магазин",
    showInNav: true
  },
  {
    path: "/contacts",
    component: withAuth(MainPage),
    title: "Контакты",
    showInNav: true
  },
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
