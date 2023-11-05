import "./index.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ThemeService } from "@/stores/theme.service.ts";
import { observer } from "mobx-react-lite";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./transitions.scss";
import PrivateRoute from "@/hoc/PrivateRoute";
import { Login, MainPage, ResetPassword } from "../pages";

interface RouteType {
  path: string;
  component: React.ComponentType;
  title: string;
  isPrivate: boolean;
}

export const routesConfig: RouteType[] = [
  {
    path: "/",
    component: MainPage,
    title: "Главная",
    isPrivate: true
  },
  {
    path: "/tasks",
    component: MainPage,
    title: "Задания",
    isPrivate: true
  },
  {
    path: "/events",
    component: MainPage,
    title: "События",
    isPrivate: true
  },
  {
    path: "/me",
    component: MainPage,
    title: "Профиль",
    isPrivate: true
  },
  {
    path: "/shop",
    component: MainPage,
    title: "Магазин",
    isPrivate: true
  },
  {
    path: "/contacts",
    component: MainPage,
    title: "Контакты",
    isPrivate: true
  },
  {
    path: "/login",
    component: Login,
    title: "Вход",
    isPrivate: false
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    title: "Восстановление пароля",
    isPrivate: false
  }
];
const App = observer(() => {
  const location = useLocation();
  const getRouteElement = (route: RouteType) => {
    return route.isPrivate ? (
      <Route
        path={route.path}
        element={
          <PrivateRoute>
            <route.component />
          </PrivateRoute>
        }
      />
    ) : (
      <Route path={route.path} element={<route.component />} />
    );
  };

  if (!ThemeService.isLoaded)
    return <div className={"w-full h-full flex items-center justify-center"}>⏳Загрузка...</div>;
  console.log("render", location.key);
  return (
    <SwitchTransition>
      <CSSTransition key={location.key} classNames="fade" timeout={150} unmountOnExit>
        <Routes location={location}>
          {routesConfig.map((route) => getRouteElement(route))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </CSSTransition>
    </SwitchTransition>
  );
});

export default App;
