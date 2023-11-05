import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import React from "react";
import { AuthService } from "@/stores/auth.service.ts";
import { routesConfig } from "../../app";
import { DesktopHeading, MobileNav } from "@/components/navigation";

const PrivateRoute: React.FC<React.PropsWithChildren<unknown>> = observer(({ children }) => {
  const { status } = AuthService;
  const currentRoute = routesConfig.find((route) => route.path === location.pathname);
  if (status === "loading") return null;
  if (status === "anonymous") return <Navigate to="/login" />;
  document.title = currentRoute?.title || "?";
  return (
    <>
      <MobileNav />
      <DesktopHeading />
      <main id="content" tabIndex={-1} className={"flex-1"}>
        {children}
      </main>
    </>
  );
});

export default PrivateRoute;
