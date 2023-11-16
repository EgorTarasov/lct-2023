import "./index.scss";
import "./transitions.scss";
import cl from "./layout.module.scss";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ThemeService } from "@/stores/theme.service.ts";
import { observer } from "mobx-react-lite";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { RoutesStore, RoutesWithoutNav } from "./routes";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { SkipToContent } from "@/components/SkipToContent";
import { DesktopHeading, MobileNav } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AuthService } from "@/stores/auth.service";
import { toJS } from "mobx";
import "react-datepicker/dist/react-datepicker.css";

const NotFound = () => {
  return (
    <div className="appear flex delay-1000 flex-col items-center justify-center h-full">
      <h1 className="text-4xl">404</h1>
      <h2 className="text-2xl">Страница не найдена</h2>
    </div>
  );
};

const App = observer(() => {
  const location = useLocation();
  const routeFallback = useMemo(() => {
    if (AuthService.auth.state === "anonymous") {
      return <Navigate to={"/login"} />;
    }
    return <NotFound />;
  }, [AuthService.auth.state]);

  const defaultPage = useMemo(() => {
    if (AuthService.auth.state === "anonymous") {
      return <Navigate to={"/login"} />;
    }
    if (AuthService.auth.state === "loading") {
      return <></>;
    }
    if (AuthService.auth.user.user_role.name === "hr") {
      return <Navigate to={"/admin/employees"} />;
    }
  }, [AuthService.auth.state]);

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [location.pathname]);

  if (!ThemeService.isLoaded)
    return <div className={"w-full h-full flex items-center justify-center"}>⏳Загрузка...</div>;

  return (
    // check for grid template areas before change!
    <div className={`${cl.layout} text-text-primary sm:bg-bg-desktop h-fit`}>
      <SkipToContent />
      {!RoutesWithoutNav.includes(location.pathname) && (
        <>
          <MobileNav />
          <DesktopHeading />
        </>
      )}
      <main id="content" tabIndex={-1} className={"[grid-area:main] mb-4 w-full"}>
        <SwitchTransition>
          <CSSTransition key={location.pathname} classNames="fade" timeout={150} unmountOnExit>
            <Routes location={location}>
              {RoutesStore.routes.map((route, index) => (
                <Route key={index} path={route.path} element={<route.component />} />
              ))}
              <Route path="/" element={defaultPage} />
              <Route path="*" element={routeFallback} />
            </Routes>
          </CSSTransition>
        </SwitchTransition>
      </main>
      <Footer />
    </div>
  );
});

export default App;
