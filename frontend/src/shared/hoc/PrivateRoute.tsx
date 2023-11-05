import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import React from "react";
import { AuthService } from "@/stores/auth.service.ts";
import { DesktopHeading, MobileNav } from "@/components/navigation";
import { SkipToContent } from "@/components/SkipToContent";
import { routes } from "../../app/routes";

const PrivateRoute: React.FC<React.PropsWithChildren<unknown>> = observer(({ children }) => {
  const { status } = AuthService;
  const currentRoute = routes.find((route) => route.path === location.pathname);
  if (status === "loading") return null;
  if (status === "anonymous") return <Navigate to="/login" />;
  document.title = currentRoute?.title || "?";
  return (
    <>
      <SkipToContent />

      <MobileNav />
      <DesktopHeading />
      <main id="content" tabIndex={-1} className={"flex-1"}>
        {children}
      </main>
    </>
  );
});

export const withPrivateRoute = (Component: React.FC<unknown>) => {
  return () => (
    <PrivateRoute>
      <Component />
    </PrivateRoute>
  );
};
