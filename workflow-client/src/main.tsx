import React from "react";

import App from "@/App";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { AlertProvider } from "@/context/AlertContext";
import { ModalProvider } from "@/context/ModalContext";
import { UserProvider } from "@/context/UserContext";

import "@/config/api.conf";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ModalProvider>
      <UserProvider>
        <AlertProvider>
          <Router>
            <App />
          </Router>
        </AlertProvider>
      </UserProvider>
    </ModalProvider>
  </React.StrictMode>
);
