import React, { useContext, useState, useEffect } from "react";
import NavItem from "components/layout/Navbar/NavItem";
import ThemeSwitch from "components/general/ThemeSwitch";
import Notification, { NotificationResponse } from "components/general/Notification";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "context/UserContext";
import { getNotifications, removeNotification } from "service";
import DropdownMenuItem from "components/general/DropdownMenu/DropdownMenuItem";
import "./UserNav.scss";

const UserNav: React.FC = () => {
  const history = useHistory();

  const [{ user }, dispatchUser] = useContext(UserContext);
  const [notifications, setNotification] = useState<NotificationResponse[]>([]);

  const handlGetMyNotifications = async () => {
    const { data } = await getNotifications();
    if (!!data) setNotification(data.notifications);
  };

  useEffect(() => {
    handlGetMyNotifications();
    return () => {};
  }, []);

  const goToHomePage = () => {
    history.push("/");
  };

  const logOutUser = () => {
    dispatchUser({ type: "LOGOUT" });
  };
  const removeMessage = async (index: number) => {
    const { status } = await removeNotification({ notificationId: notifications[index]._id });
    if (status)
      setNotification((notifications) => {
        const newNotification = [...notifications];
        newNotification.splice(index, 1);
        return newNotification;
      });
  };

  return (
    <>
      <ThemeSwitch />
      <NavItem name="home" onClick={goToHomePage} icon={<HomeIcon />} />
      <NavItem
        name="profile"
        offset={{ x: -60, y: 10 }}
        icon={<AccountBoxIcon />}
        label={user.username}
        className="profile-nav">
        <DropdownMenuItem>
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="logout-btn" onClick={logOutUser}>
            logout
          </span>
        </DropdownMenuItem>
      </NavItem>
      <NavItem
        name="notiications"
        onClick={handlGetMyNotifications}
        offset={{ x: -20, y: 10 }}
        className="notification-nav"
        dropDownScrollableAt={400}
        dropDownOnClickClose={false}
        icon={
          <Badge color="secondary" variant="dot" invisible={notifications.length < 1}>
            <NotificationsIcon />
          </Badge>
        }>
        {notifications.map(({ _id, title, info, url }, index) => (
          <DropdownMenuItem key={_id}>
            <Notification
              message={info}
              boardTitle={title}
              url={url}
              removeNotification={() => removeMessage(index)}
            />
          </DropdownMenuItem>
        ))}
      </NavItem>
    </>
  );
};

export default UserNav;
