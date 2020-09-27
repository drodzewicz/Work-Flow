import React, { useContext, useState, useEffect } from "react";
import Navbar from "components/Navbar/Navbar";
import Modal from "components/Modal/Modal";
import "./App.scss";
import { UserContext } from "context/UserContext";

import Routes from "routes/Routes";

import Footer from "components/Footer/Footer";
import LoadingOverlay from "components/LoadingOverlay/LoadingOverlay";
import fetchData from "helper/fetchData";

function App() {
	const [{ user, authStatus, theme }, dispatchUser] = useContext(UserContext);
	const [authLoading, setAuthLoading] = useState(true);
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		const checkUserAuthentication = async () => {
			const { data, status } = await fetchData({
				url: "/isAuth",
				token: true,
				method: "GET",
				// setLoading: setAuthLoading,
			});
			if (status === 401) dispatchUser({ type: "LOGIN_FAIL" });
			if (!!data) dispatchUser({ type: "LOGIN_SUCCESS", payload: { user: data.user } });
		};
		checkUserAuthentication();

		return () => {};
	}, [dispatchUser]);

	useEffect(() => {
		if(authStatus === "success" || authStatus === "failed" ) setAuthLoading(false);
		// if(authStatus !== "success" ) setIsAuth(true);
		return () => {};
	}, [authStatus]);

	return (
		<div className={`App ${theme ? "theme-light" : "theme-dark"}`}>
			<Modal />
			<LoadingOverlay show={authLoading} />
			<Navbar user={user} />
			{!authLoading && <Routes />}
			<Footer />
		</div>
	);
}

export default App;
