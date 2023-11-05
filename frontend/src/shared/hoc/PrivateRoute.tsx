import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import React from "react";
import { AuthService } from "@/stores/auth.service.ts";
import { DesktopHeading } from "@/components/navigation";

const PrivateRoute: React.FC<React.PropsWithChildren<unknown>> = observer(({ children }) => {
  const { status } = AuthService;
  console.log(status);
  if (status === "loading") return null;
  if (status === "anonymous") return <Navigate to="/login" />;
  return (
    <>
      <DesktopHeading />
      {children}
    </>
  );
});

export default PrivateRoute;
