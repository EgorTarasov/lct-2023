import "./index.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ThemeService } from "@/stores/theme.service.ts";
import { observer } from "mobx-react-lite";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./transitions.scss";
import { routes, RoutesWithoutNav } from "./routes";
import { useLayoutEffect, useState } from "react";
import { SkipToContent } from "@/components/SkipToContent";
import { DesktopLayout, MobileNav } from "@/components/navigation";

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
    <div className={"relative z-0 flex h-full w-full overflow-hidden flex-col"}>
      {!RoutesWithoutNav.includes(location.pathname) && (
        <>
          <MobileNav />
        </>
      )}
      <SkipToContent />
      <DesktopLayout>
        <main id="content" tabIndex={-1} className={"relative z-0 h-max w-full overflow-hidden"}>
          <SwitchTransition>
            <CSSTransition key={location.key} classNames="fade" timeout={150} unmountOnExit>
              <Routes location={location}>
                {MappedRoutes}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </CSSTransition>
          </SwitchTransition>
        </main>
      </DesktopLayout>
    </div>
  );
});

export default App;
