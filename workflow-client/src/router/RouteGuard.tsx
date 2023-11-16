import React from "react";

import { useLocation, Navigate, Outlet } from "react-router-dom";

import useAuth from "@/hooks/useAuth";

interface IRouteGuardProps {
  redirectTo: string;
  anonymous?: boolean;
}

const RouteGuard: React.FC<IRouteGuardProps> = ({ redirectTo, anonymous = false }) => {
  const location = useLocation();
  const { user } = useAuth();

  if ((anonymous && !user) || (!anonymous && user)) {
    return <Outlet />;
  }
  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  return <Navigate to={redirectTo} state={{ from: location }} />;
};

export default RouteGuard;
