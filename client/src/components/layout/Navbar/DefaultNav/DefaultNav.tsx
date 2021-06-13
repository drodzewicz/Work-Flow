import React, { useContext } from "react";
import NavItem from "components/layout/Navbar/NavItem/NavItem";
import Login from "components/modalForms/Login";
import Register from "components/modalForms/Register/Register";
import { ModalContext, ModalActionType } from "context/ModalContext";
import "./DefaultNav.scss";

const DefaultNav: React.FC = () => {
  const { modalDispatch } = useContext(ModalContext);

  const openLoginModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: { render: <Login />, title: "Login" },
    });
  };
  const openRegisterModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: { render: <Register />, title: "Register" },
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
