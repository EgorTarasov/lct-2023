import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import React from "react";
import { AuthService } from "@/stores/auth.service.ts";
import { RoutesStore } from "../../app/routes";

export const PrivateRoute: React.FC<React.PropsWithChildren<unknown>> = observer(({ children }) => {
  const { auth: status } = AuthService;
  if (status.state === "loading") return null;
  if (status.state === "anonymous") return <Navigate to="/login" />;

  const currentRoute = RoutesStore.routes.find((route) => route.path === location.pathname);
  document.title = currentRoute?.title || "?";

  return children;
});
