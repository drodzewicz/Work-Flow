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
	const [{ user, theme }, dispatchUser] = useContext(UserContext);
	const [authLoading, setAuthLoading] = useState(false);

	useEffect(() => {
		const isUserAuthenticated = async () => {
			const { data, status } = await fetchData({
				url: "/isAuth",
				token: true,
				method: "GET",
				setLoading: setAuthLoading,
			});
			if (status === 401) dispatchUser({ type: "LOGOUT" });
			if (!!data) dispatchUser({ type: "LOGIN", payload: { user: data.user } });
		};
		isUserAuthenticated();

		return () => {};
	}, [dispatchUser]);

	return (
		<div className={`App ${theme ? "theme-light" : "theme-dark"}`}>
			<Modal />
			{/* <LoadingOverlay show={authLoading} /> */}
			<Navbar user={user} />
			<Routes />
			<Footer />
		</div>
	);
}

export default App;
