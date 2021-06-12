import React, { useRef } from "react";
import "./NavItem.scss";
import DropdownMenu from "components/general/DropdownMenu/DropdownMenu";
import { NavItemProps } from "./";

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  children,
  onClick,
  className,
  offset,
  name,
  dropDownOnClickClose,
  dropDownScrollableAt,
}) => {
  const anchorElement = useRef(null);

  return (
    <li className={`navbar__item ${className || ""}`}>
      <button name={name} className="navbar__item__button" ref={anchorElement} onClick={onClick}>
        <span className="navbar__item__icon">{!!icon && icon}</span>
        <span className="navbar__item__label">{label}</span>
      </button>
      {children && (
        <DropdownMenu
          className={className}
          scrollableAt={dropDownScrollableAt}
          onClickClose={dropDownOnClickClose}
          offset={offset}
          anchorEl={anchorElement}>
          {children}
        </DropdownMenu>
      )}
    </li>
  );
};


export default NavItem;
