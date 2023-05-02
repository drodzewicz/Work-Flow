import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { ModalProvider } from "@/context/ModalContext";
import { UserProvider } from "@/context/UserContext";
import { AlertProvider } from "@/context/AlertContext";
import { BrowserRouter as Router } from "react-router-dom";
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
