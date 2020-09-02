import React from "react";
import PropTypes from "prop-types";
import "./Navbar.scss";


const Navbar = ({children}) => {
  return (
    <nav className="navbar">
      {children}
    </nav>
  );
};

Navbar.propTypes = {
  children: PropTypes.node
}

export default Navbar;

