import "./index.css";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ThemeService } from "@/stores/theme.service.ts";
import { observer } from "mobx-react-lite";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./transitions.scss";
import PrivateRoute from "@/hoc/PrivateRoute";
import { Login, MainPage, ResetPassword } from "../pages";

const App = observer(() => {
  const location = useLocation();

  if (!ThemeService.isLoaded)
    return <div className={"w-full h-full flex items-center justify-center"}>⏳Загрузка...</div>;
  console.log("render", location.key);
  return (
    <SwitchTransition>
      <CSSTransition key={location.key} classNames="fade" timeout={150} unmountOnExit>
        <Routes location={location}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
          <Route path="/tasks">
            <Route index element={<h1>v</h1>} />
            <Route path="program" element={<h1>d</h1>} />
          </Route>
          <Route path="/events" element={<MainPage />} />
          <Route path="/me" element={<MainPage />} />
          <Route path="/shop" element={<MainPage />} />
          <Route path="/contacts" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </CSSTransition>
    </SwitchTransition>
  );
});

export default App;
