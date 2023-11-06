import { withAuth } from "@/hoc/PrivateRoute";
import { ComponentType } from "react";
import { Login, MainPage, ResetPassword } from "../pages";
import { ProfilePage } from "../pages/profile/profile.page.tsx";
import { EventsPage } from "../pages/events/events.page.tsx";
import { EducationPage } from "../pages/education/education.page.tsx";
import { TasksPage } from "../pages/tasks/tasks.page.tsx";

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
    path: "/education",
    component: withAuth(EducationPage),
    title: "Обучение",
    showInNav: true
  },
  {
    path: "education/:id",
    component: withAuth(EducationPage),
    title: "Обучение",
    showInNav: false
  },
  {
    path: "/tasks",
    component: withAuth(TasksPage),
    title: "Задания",
    showInNav: true
  },
  {
    path: "tasks/:id",
    component: withAuth(TasksPage),
    title: "Задания"
  },
  {
    path: "/events",
    component: withAuth(EventsPage),
    title: "Мероприятия",
    showInNav: true
  },
  {
    path: "/events/:id",
    component: withAuth(EventsPage),
    title: "Мероприятия",
    showInNav: false
  },
  {
    path: "/me",
    component: withAuth(ProfilePage),
    title: "Профиль"
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
