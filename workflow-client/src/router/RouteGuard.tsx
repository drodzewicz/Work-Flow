import React, { useContext, PropsWithChildren } from "react";

import { useLocation, Navigate } from "react-router-dom";

import { UserContext } from "@/context/UserContext";

type RouteGuardConditionType = (attrs: { isAuthenticated: boolean }) => boolean;

interface IRouteGuardProps {
  redirectTo: string;
  condition: RouteGuardConditionType;
}

const RouteGuard: React.FC<PropsWithChildren<IRouteGuardProps>> = ({
  children,
  condition,
  redirectTo,
}) => {
  const {
    userState: { authenticated, user },
  } = useContext(UserContext);

  const location = useLocation();
  const token = localStorage.getItem("token");
  const isAuthenticated =
    (authenticated !== null && authenticated) || (authenticated === null && !!token);

  // FIXME implement router guards
  // if (condition({ isAuthenticated: !!user })) {
    return <>{children}</>;
  // }

  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  return <Navigate to={redirectTo} state={{ from: location }} />;
};

export default RouteGuard;
