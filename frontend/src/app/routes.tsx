import { ComponentType } from "react";
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
import { observer } from "mobx-react-lite";
import { AuthService } from "@/stores/auth.service.ts";
import { autorun, makeAutoObservable } from "mobx";
import { OnboardingPage } from "../pages/onboarding/onboarding.page.tsx";
import { MainPage } from "../pages/main/main.page.tsx";
import { Login } from "../pages/login/Login.tsx";
import { ResetPassword } from "../pages/reset-password/ResetPassword.tsx";

export interface RouteType {
  path: string;
  component: ComponentType;
  title: string;
  showInNav?: boolean;
}

export const RoutesWithoutNav = ["/login", "/reset-password"];

const userRoutes: RouteType[] = [
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
    path: "/me",
    component: () => (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
    title: "Профиль"
  },
  {
    path: "/onboarding",
    component: () => (
      <PrivateRoute>
        <OnboardingPage />
      </PrivateRoute>
    ),
    title: "Онбординг",
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
    path: "/education/:id/task/:taskId",
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
  }
];

const adminRoutes: RouteType[] = [
  {
    path: "/admin/employees",
    component: () => (
      <PrivateRoute>
        <EmployeesPage />
      </PrivateRoute>
    ),
    showInNav: true,
    title: "Сотрудники"
  },
  {
    path: "/admin/onboarding",
    component: () => (
      <PrivateRoute>
        <AdminOnboardingPage />
      </PrivateRoute>
    ),
    showInNav: true,
    title: "Материалы онбординга"
  },
  {
    path: "/admin/branding",
    component: () => (
      <PrivateRoute>
        <BrandingPage />
      </PrivateRoute>
    ),
    showInNav: true,
    title: "Оформление"
  },
  {
    path: "/admin/education",
    component: () => (
      <PrivateRoute>
        <AdminEducationPage />
      </PrivateRoute>
    ),
    showInNav: true,
    title: "Образовательные материалы"
  },
  {
    path: "/admin/events",
    component: () => (
      <PrivateRoute>
        <AdminEventsPage />
      </PrivateRoute>
    ),
    showInNav: true,
    title: "Мероприятия"
  },
  {
    path: "/admin/analytics",
    component: () => (
      <PrivateRoute>
        <AnalyticsPage />
      </PrivateRoute>
    ),
    showInNav: true,
    title: "Аналитика"
  },
  {
    path: "/me",
    component: () => (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
    title: "Профиль"
  }
];

export const globalRoutes: RouteType[] = [
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

class routesStore {
  constructor() {
    makeAutoObservable(this);
    autorun(() => {
      if (AuthService.auth.state === "loading" || AuthService.auth.state === "anonymous") {
        this._routes = globalRoutes;
        return;
      }
      if (AuthService.auth.user.user_role.name === "hr") {
        this._routes = adminRoutes;
        return;
      }
      this._routes = userRoutes;
    });
  }

  private _routes: RouteType[] = [];
  get routes() {
    return this._routes;
  }
}

export const RoutesStore = new routesStore();
