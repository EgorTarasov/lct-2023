import "./index.css";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ThemeService } from "@/stores/theme.service.ts";
import { observer } from "mobx-react-lite";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./transitions.scss";
import { RoutesStore, RoutesWithoutNav } from "./routes";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { SkipToContent } from "@/components/SkipToContent";
import { DesktopHeading, MobileNav } from "@/components/navigation";
import { Footer } from "@/components/footer";
import cl from "./layout.module.scss";
import { AuthService } from "@/stores/auth.service";
import { toJS } from "mobx";

const App = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const routeFallback = useMemo(() => {
    if (AuthService.auth.state === "anonymous") {
      return "/login";
    }
    if (AuthService.auth.state === "loading") {
      return "/";
    }
    if (AuthService.auth.user.user_role.name === "hr") {
      return "/admin/employees";
    }
    return "/";
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
              <Route path="*" element={<Navigate to={routeFallback} />} />
            </Routes>
          </CSSTransition>
        </SwitchTransition>
      </main>
      <Footer />
    </div>
  );
});

export default App;
