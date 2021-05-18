import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import App from "./App/App";
import * as serviceWorker from "./serviceWorker";
import { ModalProvider } from "./context/ModalContext";
import { UserProvider } from "./context/UserContext";
import { WarningNotificationProvider } from "./context/WarningNotificationContext";
import { BrowserRouter as Router } from "react-router-dom";
import { BASE_URL, ENVIROMENTS } from "config/default.conf";

const BASE_API_URI = process.env.REACT_APP_API_URI || BASE_URL;
const API_URI = process.env.NODE_ENV === ENVIROMENTS.PROD ? "/" : BASE_API_URI;

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
