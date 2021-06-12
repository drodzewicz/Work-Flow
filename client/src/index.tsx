import React from "react";
import ReactDOM from "react-dom";

import "config/api.conf";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ModalProvider } from "./context/ModalContext";
import { UserProvider } from "./context/UserContext";
import { AlertProvider } from "./context/AlertContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <ModalProvider>
    <UserProvider>
      <AlertProvider>
        <Router>
          <App />
        </Router>
      </AlertProvider>
    </UserProvider>
  </ModalProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
