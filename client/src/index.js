import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App/App";
import * as serviceWorker from "./serviceWorker";
import { ModalProvider } from "./context/ModalContext";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

const { REACT_APP_API_URL } = process.env;
console.log(REACT_APP_API_URL);
axios.defaults.baseURL = REACT_APP_API_URL;

ReactDOM.render(
	<ModalProvider>
		<UserProvider>
			<Router>
				<App />
			</Router>
		</UserProvider>
	</ModalProvider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
