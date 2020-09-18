import React, { useContext, useState } from "react";
import NavItem from "components/Navbar/NavItem";
import SwitchButton from "components/SwitchButton/SwitchButton";
import Notification from "components/Notification/Notification";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "context/UserContext";

const LoggedInUserNav = () => {
	const history = useHistory();

	const [{ user, theme }, dispatchUser] = useContext(UserContext);
	const [notifications, setNotification] = useState([
		{ board: "wix websiite", message: "you have been added to the board" },
		{
			board: "learing wordpress with friends",
			message: "you have been added to the boardyou have been addeddwd dwdwd dwdwd",
		},
		{ board: "making apython game", message: "you got a new task" },
	]);

	const goToHomePage = () => {
		history.push("/");
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

export default LoggedInUserNav;
