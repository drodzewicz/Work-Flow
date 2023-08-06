import React from "react";

import { FaSignOutAlt, FaUserAlt, FaHome, FaBell } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "@/hooks/useAuth";

import useGetNotifications from "@/service/useGetNotifications";

import DropdownMenuItem from "@/components/general/DropdownMenu/DropdownMenuItem";
import ThemeSwitch from "@/components/general/ThemeSwitch";

import NavItem from "@/components/layout/Navbar/NavItem";

import "../Navbar.scss";
import "./UserNav.scss";

const UserNav: React.FC = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { data: notifications = [] } = useGetNotifications();

  const goToHomePage = () => {
    navigate("/dashboard");
  };

  const removeMessage = async (index: number) => {
    //
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handlGetMyNotifications = () => {
    //
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
          <Link to="/profile">
            <FaUserAlt /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> logout
          </span>
        </DropdownMenuItem>
      </NavItem>
      <NavItem
        name="notiications"
        onClick={handlGetMyNotifications}
        offset={{ x: -20, y: 10 }}
        className={`notification-nav ${notifications?.length ? "badge" : ""}`}
        dropDownScrollableAt={400}
        dropDownOnClickClose={false}
        Icon={FaBell}
      >
        {/* {notifications.map(({ _id, title, info, url }, index) => (
          <DropdownMenuItem key={_id}>
            <Notification
              message={info}
              boardTitle={title}
              url={url}
              removeNotification={() => removeMessage(index)}
            />
          </DropdownMenuItem>
        ))} */}
      </NavItem>
    </nav>
  );
};

export default UserNav;
