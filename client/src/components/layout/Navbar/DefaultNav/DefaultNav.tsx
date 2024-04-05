import React from "react";

import { FaHome } from "react-icons/fa";

import NavItem from "@/components/layout/Navbar/NavItem";

import Login from "@/dialogs/Login/Login";

import "../Navbar.scss";

import Modal from "@/components/layout/Modal";
import useRedirect from "@/hooks/useRedirect";

const DefaultNav: React.FC = () => {
    const { location, goTo } = useRedirect();

    return (
        <>
            <NavItem name="home" to="/" Icon={FaHome} />
            <NavItem label="Login" to="/#login" />
            <NavItem label="Register" to="/register" />
            <Modal show={location.hash === "#login"} title="Login" size="s" onClose={goTo.home}>
                <Login initialValues={location.state} />
            </Modal>
        </>
    );
};

export default DefaultNav;
