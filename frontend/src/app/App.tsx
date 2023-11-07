import "./index.css";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ThemeService } from "@/stores/theme.service.ts";
import { observer } from "mobx-react-lite";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./transitions.scss";
import { RoutesWithoutNav, routes } from "./routes";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { SkipToContent } from "@/components/SkipToContent";
import { DesktopHeading, MobileNav } from "@/components/navigation";
import { Footer } from "@/components/footer";
import cl from "./layout.module.scss";

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
      <Route key={index} path={route.path} element={<route.component />} />
    ))
  );

  if (!ThemeService.isLoaded)
    return <div className={"w-full h-full flex items-center justify-center"}>⏳Загрузка...</div>;

  return (
    // check for grid template areas before change!
    <div className={`${cl.layout} text-text-primary`}>
      <SkipToContent />
      {!RoutesWithoutNav.includes(location.pathname) && (
        <>
          <MobileNav />
          <DesktopHeading />
        </>
      )}
      <main id="content" tabIndex={-1} className={"[grid-area:main] h-max-content"}>
        <SwitchTransition>
          <CSSTransition key={location.pathname} classNames="fade" timeout={150} unmountOnExit>
            <Routes location={location}>
              {MappedRoutes}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </CSSTransition>
        </SwitchTransition>
      </main>
      <Footer />
    </div>
  );
});

export default App;
