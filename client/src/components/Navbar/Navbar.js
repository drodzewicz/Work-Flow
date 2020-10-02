import React from "react";
import PropTypes from "prop-types";
import "./Navbar.scss";

import DefaultNav from "./DefaultNav";
import LoggedInUserNav from "./LoggedInUserNav";

const Navbar = ({isAuth}) => {
	return <nav className="navbar">{isAuth ? <LoggedInUserNav /> : <DefaultNav />}</nav>;
};

Navbar.defaultProps = {
  isAuth: false
};

Navbar.propTypes = {
  isAuth: PropTypes.bool
};

export default Navbar;
