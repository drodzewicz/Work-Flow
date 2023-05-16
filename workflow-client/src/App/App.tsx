import React, { useContext, useEffect } from "react";

import { Outlet, useLoaderData } from "react-router-dom";

import { AlertContext } from "@/context/AlertContext";
import { UserActionType, UserContext } from "@/context/UserContext";

import "@/config/api.conf";

import WarningNotification from "@/components/general/Alert";

import Footer from "@/components/layout/Footer";
import DefaultNav from "@/components/layout/Navbar/DefaultNav";
import UserNav from "@/components/layout/Navbar/UserNav";

import "./App.scss";

const App: React.FC = () => {
  const { alertState } = useContext(AlertContext);
  const { userState, userDispatch } = useContext(UserContext);
  const data = useLoaderData() as { user: unknown; authorized: boolean };

  useEffect(() => {
    console.log("dwd",data)
    userDispatch({ type: UserActionType.LOGIN_SUCCESS, payload: { user: data.user } });
  }, [data]);

  return (
    <div className="App scrollbar">
      <WarningNotification
        show={alertState.show}
        message={alertState.message}
        type={alertState.type}
      />
      {userState.user ? <UserNav /> : <DefaultNav />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
