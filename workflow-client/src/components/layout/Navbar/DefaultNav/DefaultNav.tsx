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

  const openLoginModal = () => {
    navigate("/#login");
  };
  const closeLoginModal = () => {
    navigate("/");
  };
  const openRegisterModal = () => {
    navigate("/register");
  };
  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <NavItem name="home" onClick={goToHomePage} Icon={FaHome} />
        <NavItem label="Login" onClick={openLoginModal} />
        <NavItem label="Register" onClick={openRegisterModal} />
      </nav>
      <Modal show={location.hash === "#login"} title="Login" size="s" onClose={closeLoginModal}>
        <Login initialValues={location.state as { username?: string; password?: string }} />
      </Modal>
    </>
  );
};

export default DefaultNav;
