import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App/App";
import * as serviceWorker from "./serviceWorker";
import { ModalProvider } from "./context/ModalContext";
import { UserProvider } from "./context/UserContext";
import { WarningNotificationProvider } from "./context/WarningNotificationContext";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

const { REACT_APP_API_URL } = process.env;
axios.defaults.baseURL = REACT_APP_API_URL;

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
