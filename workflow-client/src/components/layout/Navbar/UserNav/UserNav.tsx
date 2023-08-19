import React from "react";

import { FaSignOutAlt, FaUserAlt, FaHome, FaBell, FaMoon, FaSun } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import useAppTheme from "@/hooks/useAppTheme";
import useAuth from "@/hooks/useAuth";

import useGetCurrentUser from "@/service/useGetCurentUser";
import useGetNotifications from "@/service/useGetNotifications";
import useLogout from "@/service/useLogout";

import DropdownMenuItem from "@/components/general/DropdownMenu/DropdownMenuItem";
import Notification from "@/components/general/Notification";

import NavItem from "@/components/layout/Navbar/NavItem";

import "./UserNav.scss";

const UserNav: React.FC = () => {
  const navigate = useNavigate();

  const { user, token, login, logout } = useAuth();
  const { themeState, toggleTheme } = useAppTheme();
  const { mutate: logoutUser } = useLogout({
    onSuccess: () => {
      logout();
      navigate("/");
    },
  });

  useGetCurrentUser({
    onSuccess: (user) => {
      login({ user, token: token as string });
    },
  });

  const { data: notifications = [] } = useGetNotifications();

  return (
    <nav className="navbar">
      <NavItem name="home" to="/dashboard" Icon={FaHome} />
      <NavItem
        name="profile"
        dropdownOffset={{ x: -105, y: 10 }}
        Icon={FaUserAlt}
        label={user.username}
        className="profile-nav"
      >
        <DropdownMenuItem>
          <Link to="/profile">
            <FaUserAlt /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleTheme}>
          {themeState ? <FaSun /> : <FaMoon />}
          Switch theme
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="logout-btn" onClick={() => logoutUser()}>
            <FaSignOutAlt /> logout
          </span>
        </DropdownMenuItem>
      </NavItem>
      <NavItem
        name="notiications"
        dropdownOffset={{ x: -25, y: 10 }}
        className={`notification-nav ${notifications?.length ? "badge" : ""}`}
        dropdownMaxHeight={400}
        dropDownOnClickClose={false}
        Icon={FaBell}
      >
        {notifications.map((notification) => (
          <Notification notification={notification} />
        ))}
      </NavItem>
    </nav>
  );
};

export default UserNav;
