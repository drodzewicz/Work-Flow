import React, { useRef } from "react";

import { FaSignOutAlt, FaUserAlt, FaHome, FaBell, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";

import useAppTheme from "@/hooks/useAppTheme";
import useAuth from "@/hooks/useAuth";

import { useLogout } from "@/service/auth";
import { useGetCurrentUser, useGetNotifications } from "@/service/self";

import DropdownMenuItem from "@/components/general/DropdownMenu/DropdownMenuItem";

import NavItem from "@/components/layout/Navbar/NavItem";

import "./UserNav.scss";
import useRedirect from "@/hooks/useRedirect";
import NotificationList from "@/components/general/NotificationList/NotificationList";

const UserNav: React.FC = () => {
    const { goTo } = useRedirect();

    const { user, login, logout } = useAuth();
    const { themeState, toggleTheme } = useAppTheme();
    const { mutate: logoutUser } = useLogout({
        onSuccess: () => {
            logout();
            goTo.home();
        },
    });

    useGetCurrentUser({
        onSuccess: (user) => {
            login({ user });
        },
    });

    const { data } = useGetNotifications();

    const menuRef = useRef<HTMLUListElement | null>(null);

    return (
        <>
            <NavItem name="home" to="/dashboard" Icon={FaHome} />
            <NavItem
                name="profile"
                dropdownOffset={{ x: -105, y: 10 }}
                Icon={FaUserAlt}
                label={user?.username}
                className="profile-nav"
            >
                <DropdownMenuItem>
                    <Link to="/profile">
                        <FaUserAlt /> Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleTheme}>
                    {themeState ? <FaSun /> : <FaMoon />}
                    Theme
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <span className="logout-btn" onClick={() => logoutUser()}>
                        <FaSignOutAlt /> Logout
                    </span>
                </DropdownMenuItem>
            </NavItem>
            <NavItem
                name="notifications"
                dropdownOffset={{ x: -25, y: 10 }}
                className={`notification-nav ${
                    data?.pages[0]?.notifications?.length ? "badge" : ""
                }`}
                dropdownMaxHeight={400}
                dropDownOnClickClose={false}
                Icon={FaBell}
                menuRef={menuRef}
            >
                <NotificationList getScrollParent={() => menuRef.current} />
            </NavItem>
        </>
    );
};

export default UserNav;
