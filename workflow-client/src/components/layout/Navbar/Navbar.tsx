import React from "react";
import "./Navbar.scss";

import DefaultNav from "./DefaultNav";
import UserNav from "./UserNav";
import { NavbarProps } from "./";

const Navbar: React.FC<NavbarProps> = ({ isAuth }) => {
  return <nav className="navbar">{isAuth ? <UserNav /> : <DefaultNav />}</nav>;
};

export default Navbar;
