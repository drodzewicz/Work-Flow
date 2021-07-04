import React, { useContext, useState, useEffect } from "react";
import Navbar from "components/layout/Navbar";
import Modal from "components/layout/Modal/Modal";
import "./App.scss";
import { UserContext, UserActionType } from "context/UserContext";
import { AlertContext } from "context/AlertContext";

import Routes from "views/Routes";

import Footer from "components/layout/Footer";
import LoadingOverlay from "components/layout/LoadingOverlay/LoadingOverlay";
import WarningNotification from "components/general/WarningNotification";
import { isUserAuthenticated } from "service";

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
      if (!!data) userDispatch({ type: UserActionType.LOGIN_SUCCESS, payload: { user: data.user } });
    };
    checkUserAuthentication();

    return () => {};
  }, [userDispatch]);

  useEffect(() => {
    if (authStatus === "success" || authStatus === "failed") setAuthLoading(false);
    return () => {};
  }, [authStatus]);

  return (
    <div className="App">
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
