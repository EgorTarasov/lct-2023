import { ComponentType } from "react";
import { Login, MainPage, ResetPassword } from "../pages";
import { ProfilePage } from "../pages/profile/profile.page.tsx";
import { EventsPage } from "../pages/events/events.page.tsx";
import { EducationPage } from "../pages/education/education.page.tsx";
import { TasksPage } from "../pages/tasks/tasks.page.tsx";
import { ShopPage } from "../pages/shop/shop.page.tsx";
import { StaffPage } from "../pages/staff/staff.page.tsx";

export interface RouteType {
  path: string;
  component: ComponentType;
  title: string;
  showInNav?: boolean;
}

export const routes: RouteType[] = [
  {
    path: "/",
    component: MainPage,
    title: "Главная",
    showInNav: true
  },
  {
    path: "/education",
    component: EducationPage,
    title: "Обучение",
    showInNav: true
  },
  {
    path: "/education/:id",
    component: EducationPage,
    title: "Обучение",
    showInNav: false
  },
  {
    path: "/tasks",
    component: TasksPage,
    title: "Задания",
    showInNav: true
  },
  {
    path: "/tasks/:id",
    component: TasksPage,
    title: "Задания"
  },
  {
    path: "/staff",
    component: StaffPage,
    title: "Сотрудники",
    showInNav: true
  },
  {
    path: "/events",
    component: EventsPage,
    title: "Мероприятия",
    showInNav: true
  },
  {
    path: "/events/:id",
    component: EventsPage,
    title: "Мероприятия",
    showInNav: false
  },
  {
    path: "/me",
    component: ProfilePage,
    title: "Профиль"
  },
  {
    path: "/shop",
    component: ShopPage,
    title: "Магазин",
    showInNav: true
  },
  {
    path: "/shop/:id",
    component: ShopPage,
    title: "Магазин",
    showInNav: false
  },
  {
    path: "/contacts",
    component: MainPage,
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
