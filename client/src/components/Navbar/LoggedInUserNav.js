import React, { useContext, useState, useEffect } from "react";
import NavItem from "components/Navbar/NavItem";
import SwitchButton from "components/SwitchButton/SwitchButton";
import Notification from "components/Notification/Notification";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "context/UserContext";
import { getNotifications, removeNotification } from "service";

const LoggedInUserNav = () => {
	const history = useHistory();

	const [{ user, theme }, dispatchUser] = useContext(UserContext);
	const [notifications, setNotification] = useState([]);

	const handlGetMyNotifications = async () => {
		const { data } = await getNotifications();
		if (!!data) setNotification(data.notifications);
	}

	useEffect(() => {
		handlGetMyNotifications();
		return () => { }
	}, [])

	const goToHomePage = () => {
		history.push("/");
	};

	const logOutUser = () => {
		dispatchUser({ type: "LOGOUT" });
	};
	const toggleTheme = () => {
		dispatchUser({ type: "THEME_TOGGLE" });
	};
	const removeMessage = async (index) => {
		const { status } = await removeNotification({ notificationId: notifications[index]._id }); 
		if (status) setNotification((notifications) => {
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
				clicked={handlGetMyNotifications}
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
				{notifications.map(({ _id, title, info, url }, index) => (
					<Notification
						key={_id}
						message={info}
						boardTitle={title}
						url={url}
						removeNotification={() => removeMessage(index)}
					/>
				))}
			</NavItem>
		</>
	);
};

export default LoggedInUserNav;
