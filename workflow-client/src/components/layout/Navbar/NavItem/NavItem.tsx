import React, { useRef } from "react";

import { NavItemProps } from "./types";

import DropdownMenu from "@/components/general/DropdownMenu/DropdownMenu";

import "./NavItem.scss";

const NavItem: React.FC<NavItemProps> = ({
  Icon,
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
        {!!Icon && <span className="navbar__item__icon">{!!Icon && <Icon />}</span>}
        {!!label && <span className="navbar__item__label">{label}</span>}
      </button>
      {children && (
        <DropdownMenu
          className={className}
          scrollableAt={dropDownScrollableAt}
          onClickClose={dropDownOnClickClose}
          offset={offset}
          anchorEl={anchorElement}
        >
          {children}
        </DropdownMenu>
      )}
    </li>
  );
};

export default NavItem;
