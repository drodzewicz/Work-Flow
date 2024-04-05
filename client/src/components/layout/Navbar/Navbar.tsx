import React from "react";

import useAuth from "@/hooks/useAuth";

import "./Navbar.scss";

import DefaultNav from "./DefaultNav";
import UserNav from "./UserNav";

const Navbar: React.FC = () => {
    const { user } = useAuth();

    return (
        <nav className="navbar" aria-label="navbar">
            {user ? <UserNav /> : <DefaultNav />}
        </nav>
    );
};

export default Navbar;
