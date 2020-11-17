import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.scss";
import App from "./App/App";
import * as serviceWorker from "./serviceWorker";
import { ModalProvider } from "./context/ModalContext";
import { UserProvider } from "./context/UserContext";
import { WarningNotificationProvider } from "./context/WarningNotificationContext";
import { BrowserRouter as Router } from "react-router-dom";

const BASE_API_URI = process.env.REACT_APP_API_URI || "http://localhost:8080"
const API_URI = process.env.NODE_ENV === "production" ? "/" : BASE_API_URI

axios.defaults.baseURL = API_URI;

ReactDOM.render(
	<ModalProvider>
		<UserProvider>
			<WarningNotificationProvider>
				<Router>
					<App />
				</Router>
			</WarningNotificationProvider>
		</UserProvider>
	</ModalProvider>,
	document.getElementById("root")
);

serviceWorker.unregister();
