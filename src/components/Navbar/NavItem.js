import React, { useState } from "react";
import "./NavItem.scss";
import PropTypes from "prop-types";
import DropdownMenu from "components/DropdownMenu/DropdownMenu"

const NavItem = ({ icon, navName, children, clicked }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  }
  const isFunction = (propFunc) => {
    return typeof propFunc === "function";
  }

  return (
    <li className="nav-item">
      <button className="icon-button" onClick={isFunction(clicked) ? clicked : toggleOpen}>
        {!!icon && icon}
        <span>{navName}</span>
      </button>

      {open && children &&
        <DropdownMenu closeMenu={toggleOpen}>
          {children}
        </DropdownMenu>
      }
    </li>
  )
}

NavItem.propTypes = {
  toggleFunction: PropTypes.func
}

export default NavItem
