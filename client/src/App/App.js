import React, { useContext, useState, useEffect } from "react";
import Navbar from "components/Navbar/Navbar";
import Modal from "components/Modal/Modal";
import "./App.scss";
import { UserContext } from "context/UserContext";

import Routes from "routes/Routes";

import Footer from "components/Footer/Footer";
import { useFetchData } from "Hooks/useFetch";
import LoadingOverlay from "components/LoadingOverlay/LoadingOverlay";

function App() {
	const authUser = useFetchData({
		url: "/isAuth",
		method: "GET",
		token: true,
	});
	const [{user, theme }, dispatchUser] = useContext(UserContext);
	const [authLoading, setAuthLoading] = useState(false);

	useEffect(() => {
		if (!!authUser.data && !!authUser.data.user) {
			dispatchUser({ type: "LOGIN", payload: { user: authUser.data.user } });
			setAuthLoading(false);
		}

		return () => {};
	}, [authUser, dispatchUser]);

	return (
		<div className={`App ${theme ? "theme-light" : "theme-dark"}`}>
			<Modal />
			<LoadingOverlay show={authLoading} />
			<Navbar user={user} />
			<Routes />
			<Footer />
		</div>
	);
}

export default App;
