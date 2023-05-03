import React, { useContext } from "react";

import { ModalContext, ModalActionType } from "@/context/ModalContext";

import NavItem from "@/components/layout/Navbar/NavItem/NavItem";

import Login from "@/dialogs/Login";
import Register from "@/dialogs/Register/Register";

import "./DefaultNav.scss";

const DefaultNav: React.FC = () => {
  const { modalDispatch } = useContext(ModalContext);

  const openLoginModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: { render: <Login />, title: "Login", size: "s" },
    });
  };
  const openRegisterModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: { render: <Register />, title: "Register", size: "s" },
    });
  };

  return (
    <>
      <NavItem label="Login" onClick={openLoginModal} />
      <NavItem label="Register" onClick={openRegisterModal} />
    </>
  );
};

export default DefaultNav;
