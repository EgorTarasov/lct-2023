import { ComponentType, ReactElement } from "react";
import { Login, MainPage, ResetPassword } from "../pages";
import { ProfilePage } from "../pages/profile/profile.page.tsx";
import { EventsPage } from "../pages/events/events.page.tsx";
import { EducationPage } from "../pages/education/education.page.tsx";
import { TasksPage } from "../pages/tasks/tasks.page.tsx";
import { ShopPage } from "../pages/shop/shop.page.tsx";
import { StaffPage } from "../pages/staff/staff.page.tsx";
import { PrivateRoute } from "@/hoc/PrivateRoute.tsx";

export interface RouteType {
  path: string;
  component: ComponentType;
  title: string;
  showInNav?: boolean;
}

export const RoutesWithoutNav = ["/login", "/reset-password"];

// This looks bad we're sorry
export const routes: RouteType[] = [
  {
    path: "/",
    component: () => (
      <PrivateRoute>
        <MainPage />
      </PrivateRoute>
    ),
    title: "Главная",
    showInNav: true
  },
  {
    path: "/education",
    component: () => (
      <PrivateRoute>
        <EducationPage />
      </PrivateRoute>
    ),
    title: "Обучение",
    showInNav: true
  },
  {
    path: "/education/:id",
    component: () => (
      <PrivateRoute>
        <EducationPage />
      </PrivateRoute>
    ),
    title: "Обучение",
    showInNav: false
  },
  {
    path: "/tasks",
    component: () => (
      <PrivateRoute>
        <TasksPage />
      </PrivateRoute>
    ),
    title: "Задания",
    showInNav: true
  },
  {
    path: "/tasks/:id",
    component: () => (
      <PrivateRoute>
        <TasksPage />
      </PrivateRoute>
    ),
    title: "Задания"
  },
  {
    path: "/contacts",
    component: () => (
      <PrivateRoute>
        <StaffPage />
      </PrivateRoute>
    ),
    title: "Сотрудники",
    showInNav: true
  },
  {
    path: "/events",
    component: () => (
      <PrivateRoute>
        <EventsPage />
      </PrivateRoute>
    ),
    title: "Мероприятия",
    showInNav: true
  },
  {
    path: "/events/:id",
    component: () => (
      <PrivateRoute>
        <EventsPage />
      </PrivateRoute>
    ),
    title: "Мероприятия",
    showInNav: false
  },
  {
    path: "/me",
    component: () => (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
    title: "Профиль"
  },
  {
    path: "/shop",
    component: () => (
      <PrivateRoute>
        <ShopPage />
      </PrivateRoute>
    ),
    title: "Магазин",
    showInNav: true
  },
  {
    path: "/shop/:id",
    component: () => (
      <PrivateRoute>
        <ShopPage />
      </PrivateRoute>
    ),
    title: "Магазин",
    showInNav: false
  },
  {
    path: "/login",
    component: () => <Login />,
    title: "Вход"
  },
  {
    path: "/reset-password",
    component: () => <ResetPassword />,
    title: "Восстановление пароля"
  }
];
