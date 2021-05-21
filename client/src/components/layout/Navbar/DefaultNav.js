import React, { useContext } from "react";
import NavItem from "components/layout/Navbar/NavItem";
import { Login, Register } from "components/modalForms";
import { ModalContext } from "context/ModalContext";

const DefaultNav = () => {
	const [, modalDispatch] = useContext(ModalContext);

	const openLoginModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: { render: <Login />, title: "Login" },
		});
	};
	const openRegisterModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: { render: <Register />, title: "Register" },
		});
	};

	return (
		<>
			<NavItem navName="Login" clicked={openLoginModal} />
			<NavItem navName="Register" clicked={openRegisterModal} />
		</>
	);
};

export default DefaultNav;
