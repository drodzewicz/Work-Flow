import React, { useContext, useEffect, useState } from "react";

import { isUserAuthenticated } from "@/service";
import Routes from "@/views/Routes";

import { AlertContext } from "@/context/AlertContext";
import { UserActionType, UserContext } from "@/context/UserContext";

import WarningNotification from "@/components/general/Alert";

import Footer from "@/components/layout/Footer";
import LoadingOverlay from "@/components/layout/LoadingOverlay";
import Modal from "@/components/layout/Modal";
import Navbar from "@/components/layout/Navbar";

import "./App.scss";

const App: React.FC = () => {
  const {
    userDispatch,
    userState: { authStatus },
  } = useContext(UserContext);

  const { alertState } = useContext(AlertContext);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const { data, status } = await isUserAuthenticated();
      if (status === 401) userDispatch({ type: UserActionType.LOGIN_FAIL });
      if (data)
        userDispatch({
          type: UserActionType.LOGIN_SUCCESS,
          payload: { user: data.user },
        });
    };
    checkUserAuthentication();
  }, [userDispatch]);

  useEffect(() => {
    if (authStatus === "success" || authStatus === "failed") setAuthLoading(false);
  }, [authStatus]);

  return (
    <div className="App scrollbar">
      <WarningNotification
        show={alertState.show}
        message={alertState.message}
        type={alertState.type}
      />
      <Modal />
      <Navbar isAuth={authStatus === "success"} />
      <LoadingOverlay className="authentication-loading" show={authLoading} opacity={0}>
        <Routes />
      </LoadingOverlay>
      <Footer />
    </div>
  );
};

export default App;
