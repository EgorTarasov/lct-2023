import "./index.css";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ThemeService } from "@/stores/theme.service.ts";
import { observer } from "mobx-react-lite";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./transitions.scss";
import { routes } from "./routes";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";

const App = observer(() => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [location.pathname]);

  const [MappedRoutes] = useState(() =>
    routes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        element={
          <div>
            <route.component />
          </div>
        }
      />
    ))
  );

  if (!ThemeService.isLoaded)
    return <div className={"w-full h-full flex items-center justify-center"}>⏳Загрузка...</div>;

  return (
    <SwitchTransition>
      <CSSTransition key={location.key} classNames="fade" timeout={150} unmountOnExit>
        <Routes location={location}>
          {MappedRoutes}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </CSSTransition>
    </SwitchTransition>
  );
});

export default App;
