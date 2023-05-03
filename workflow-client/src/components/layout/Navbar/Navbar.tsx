import React from "react";

import { NavbarProps } from "./types";

import "./Navbar.scss";

import DefaultNav from "./DefaultNav";
import UserNav from "./UserNav";

const Navbar: React.FC<NavbarProps> = ({ isAuth }) => {
  return <nav className="navbar">{isAuth ? <UserNav /> : <DefaultNav />}</nav>;
};

export default Navbar;
