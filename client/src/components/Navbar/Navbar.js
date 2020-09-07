import React from "react";
import PropTypes from "prop-types";
import "./Navbar.scss";

import DefaultNav from "./DefaultNav";
import LoggedInUserNav from "./LoggedInUserNav";

const Navbar = ({user}) => {
	return <nav className="navbar">{user ? <LoggedInUserNav /> : <DefaultNav />}</nav>;
};

Navbar.defaultProps = {
  user: null
};

Navbar.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number
  ])
};

export default Navbar;
