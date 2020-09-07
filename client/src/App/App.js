import React, { useContext, useState, useEffect } from "react";
import Navbar from "components/Navbar/Navbar";
import Modal from "components/Modal/Modal";
import { Login, Register } from "modalForms";
import "./App.scss";
import { ModalContext } from "context/ModalContext";
import { UserContext } from "context/UserContext";
import { useHistory, Link } from "react-router-dom";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import Routes from "routes/Routes";
import NavItem from "components/Navbar/NavItem";
import SwitchButton from "components/SwitchButton/SwitchButton";
import Notification from "components/Notification/Notification";
import Footer from "components/Footer/Footer";
// import { useFetchData } from "Hooks/useFetch";
import { useFetchData } from "Hooks/useFetch";

function App() {
	const authUser = useFetchData({
		url: "/isAuth",
		method: "GET",
		token: true,
	});
	const [, modalDispatch] = useContext(ModalContext);
	const [{ user, theme }, dispatchUser] = useContext(UserContext);
	const history = useHistory();
	const [notifications, setNotification] = useState([
		{ board: "wix websiite", message: "you have been added to the board" },
		{
			board: "learing wordpress with friends",
			message: "you have been added to the boardyou have been addeddwd dwdwd dwdwd",
		},
		{ board: "making apython game", message: "you got a new task" },
	]);

	useEffect(() => {
		if (!!authUser.data && !!authUser.data.user)
			dispatchUser({ type: "LOGIN", payload: { user: authUser.data.user } });
		return () => {};
	}, [authUser, dispatchUser]);

	const openLoginModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: { render: <Login />, title: "Login" },
		});
	};
	const openRegisterModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: { render: <Register />, title: "Register" },
		});
	};
	const logOutUser = () => {
		dispatchUser({ type: "LOGOUT" });
	};
	const toggleTheme = () => {
		dispatchUser({ type: "THEME_TOGGLE" });
	};
	const removeMessage = (index) => {
		setNotification((notifications) => {
			const newNotification = [...notifications];
			newNotification.splice(index, 1);
			return newNotification;
		});
	};
	const goToHomePage = () => {
		history.push("/");
	};

	const loggedInUserNavItems = () => {
		return (
			<>
				<SwitchButton toggle={toggleTheme} isOn={!theme} />
				<NavItem clicked={goToHomePage} icon={<HomeIcon />} />
				<NavItem
					offset={{ x: -60, y: 10 }}
					icon={<AccountBoxIcon />}
					navName={user.username}
					classes={["profile-nav"]}
				>
					<Link to="/profile">Profile</Link>
					<button className="logout-btn" onClick={logOutUser}>
						logout
					</button>
				</NavItem>
				<NavItem
					offset={{ x: -20, y: 10 }}
					classes={["notification-nav"]}
					dropDownScrollableAt={400}
					dropDownOnClickClose={false}
					icon={
						<Badge color="secondary" variant="dot" invisible={notifications.length < 1}>
							<NotificationsIcon />
						</Badge>
					}
				>
					{notifications.map((data, index) => (
						<Notification
							key={data.board}
							message={data.message}
							boardTitle={data.board}
							removeNotification={() => removeMessage(index)}
						/>
					))}
				</NavItem>
			</>
		);
	};
	const loggedOutUserNavItems = () => {
		return (
			<>
				<NavItem navName="Login" clicked={openLoginModal} />
				<NavItem navName="Register" clicked={openRegisterModal} />
			</>
		);
	};

	return (
		<div className={`App ${theme ? "theme-light" : "theme-dark"}`}>
			<Modal />
			<Navbar>{user ? loggedInUserNavItems() : loggedOutUserNavItems()}</Navbar>
			<Routes />
			<Footer />
		</div>
	);
}

export default App;
