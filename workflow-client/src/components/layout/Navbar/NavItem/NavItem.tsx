import React, { useRef } from "react";

import DropdownMenu from "@/components/general/DropdownMenu/DropdownMenu";

import "./NavItem.scss";

type svgIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

export interface NavItemProps {
  Icon?: svgIcon;
  label?: string;
  name?: string;
  onClick?: () => void;
  className?: string;
  dropdownOffset?: { x: number; y: number };
  dropDownOnClickClose?: boolean;
  dropdownMaxHeight?: number;
  children?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({
  Icon,
  label,
  children,
  onClick,
  className,
  dropdownOffset,
  name,
  dropDownOnClickClose,
  dropdownMaxHeight,
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
          dropdownMaxHeight={dropdownMaxHeight}
          onClickClose={dropDownOnClickClose}
          offset={dropdownOffset}
          anchorEl={anchorElement}
        >
          {children}
        </DropdownMenu>
      )}
    </li>
  );
};

export default NavItem;
