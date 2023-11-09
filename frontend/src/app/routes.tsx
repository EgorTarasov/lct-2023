import { ComponentType } from "react";
import { Login, MainPage, ResetPassword } from "../pages";
import { ProfilePage } from "../pages/profile/profile.page.tsx";
import { EventsPage } from "../pages/events/events.page.tsx";
import { EducationPage } from "../pages/education/education.page.tsx";
import { TasksPage } from "../pages/tasks/tasks.page.tsx";
import { ShopPage } from "../pages/shop/shop.page.tsx";
import { StaffPage } from "../pages/staff/staff.page.tsx";
import { PrivateRoute } from "@/hoc/PrivateRoute.tsx";
import { EmployeesPage } from "../pages/admin/employees/employees.page.tsx";
import { AdminOnboardingPage } from "../pages/admin/onboarding/adminOnboarding.page.tsx";
import { BrandingPage } from "../pages/admin/branding/branding.page.tsx";
import { AdminEducationPage } from "../pages/admin/education/admin-education.page.tsx";
import { AdminEventsPage } from "../pages/admin/events/adminEvents.page.tsx";
import { AnalyticsPage } from "../pages/admin/analytics/analytics.page.tsx";

export interface RouteType {
  path: string;
  component: ComponentType;
  title: string;
  showInNav?: boolean;
}

export const RoutesWithoutNav = ["/login", "/reset-password"];

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
    title: "Профиль",
    showInNav: true
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
  },
  {
    path: "/admin/employees",
    component: () => (
      <PrivateRoute>
        <EmployeesPage />
      </PrivateRoute>
    ),
    title: "Admin Сотрудники",
    showInNav: true
  },
  {
    path: "/admin/onboarding",
    component: () => (
      <PrivateRoute>
        <AdminOnboardingPage />
      </PrivateRoute>
    ),
    title: "Admin Материалы онбординга",
    showInNav: true
  },
  {
    path: "/admin/branding",
    component: () => (
      <PrivateRoute>
        <BrandingPage />
      </PrivateRoute>
    ),
    title: "Admin Данные о брендинге",
    showInNav: true
  },
  {
    path: "/admin/education",
    component: () => (
      <PrivateRoute>
        <AdminEducationPage />
      </PrivateRoute>
    ),
    title: "Admin Образовательные материалы",
    showInNav: true
  },
  {
    path: "/admin/events",
    component: () => (
      <PrivateRoute>
        <AdminEventsPage />
      </PrivateRoute>
    ),
    title: "Admin Мероприятия",
    showInNav: true
  },
  {
    path: "/admin/analytics",
    component: () => (
      <PrivateRoute>
        <AnalyticsPage />
      </PrivateRoute>
    ),
    title: "Admin Аналитика",
    showInNav: true
  }
];

export const adminRoutes = [];
