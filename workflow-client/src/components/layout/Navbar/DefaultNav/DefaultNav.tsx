import React from "react";

import { FaHome } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import NavItem from "@/components/layout/Navbar/NavItem/NavItem";

import Login from "@/dialogs/Login/Login";

import "../Navbar.scss";

import Modal from "../../Modal/Modal";

const DefaultNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <nav className="navbar">
        <NavItem name="home" to="/" Icon={FaHome} />
        <NavItem label="Login" to="/#login" />
        <NavItem label="Register" to="/register" />
      </nav>
      <Modal show={location.hash === "#login"} title="Login" size="s" onClose={() => navigate("/")}>
        <Login initialValues={location.state as { username?: string; password?: string }} />
      </Modal>
    </>
  );
};

export default DefaultNav;
