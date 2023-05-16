import React, { useContext, useState, useEffect } from "react";

import { NotificationI } from "@/types/general";

import { getNotifications, removeNotification } from "@/service";
import { FaSignOutAlt, FaUserAlt, FaHome, FaBell } from "react-icons/fa";
import { useNavigate, useSubmit } from "react-router-dom";

// import { useHistory, Link } from "react-router-dom";
import { UserContext, UserActionType } from "@/context/UserContext";

import DropdownMenuItem from "@/components/general/DropdownMenu/DropdownMenuItem";
import Notification from "@/components/general/Notification";
import ThemeSwitch from "@/components/general/ThemeSwitch";

import NavItem from "@/components/layout/Navbar/NavItem";

import "../Navbar.scss";
import "./UserNav.scss";

const UserNav: React.FC = () => {
  const navigate = useNavigate();

  const {
    userState: { user },
    userDispatch,
  } = useContext(UserContext);
  const [notifications, setNotification] = useState<NotificationI[]>([]);

  const handlGetMyNotifications = async () => {
    const { data } = await getNotifications();
    if (data) setNotification(data.notifications);
  };

  useEffect(() => {
    handlGetMyNotifications();
  }, []);

  const goToHomePage = () => {
    navigate("/dashboard");
  };

  const logOutUser = () => {
    userDispatch({ type: UserActionType.LOGOUT });
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
    <nav className="navbar">
      <ThemeSwitch />
      <NavItem name="home" onClick={goToHomePage} Icon={FaHome} />
      <NavItem
        name="profile"
        offset={{ x: -60, y: 10 }}
        Icon={FaUserAlt}
        label={user.username}
        className="profile-nav"
      >
        <DropdownMenuItem>
          {/* <Link to="/profile">
            <FaUserAlt /> Profile
          </Link> */}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="logout-btn" onClick={logOutUser}>
            <FaSignOutAlt /> logout
          </span>
        </DropdownMenuItem>
      </NavItem>
      <NavItem
        name="notiications"
        onClick={handlGetMyNotifications}
        offset={{ x: -20, y: 10 }}
        className={`notification-nav ${notifications.length > 0 ? "badge" : ""}`}
        dropDownScrollableAt={400}
        dropDownOnClickClose={false}
        Icon={FaBell}
      >
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
    </nav>
  );
};

export default UserNav;
