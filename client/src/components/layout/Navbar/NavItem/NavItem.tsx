import React, { PropsWithChildren, useRef } from "react";

import { useNavigate } from "react-router-dom";

import DropdownMenu from "@/components/general/DropdownMenu/DropdownMenu";

import "./NavItem.scss";

type svgIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

export interface NavItemProps {
  Icon?: svgIcon;
  label?: string;
  name?: string;
  to?: string;
  onClick?: () => void;
  className?: string;
  dropdownOffset?: { x: number; y: number };
  dropDownOnClickClose?: boolean;
  dropdownMaxHeight?: number;
}

const NavItem: React.FC<PropsWithChildren<NavItemProps>> = ({
  Icon,
  label,
  children,
  onClick,
  className,
  dropdownOffset,
  name,
  dropDownOnClickClose,
  dropdownMaxHeight,
  to,
}) => {
  const anchorElement = useRef(null);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (to) {
      navigate(to);
      return;
    }
    onClick?.();
  };

  return (
    <li className={`navbar__item ${className || ""}`}>
      <button
        name={name}
        className="navbar__item__button"
        ref={anchorElement}
        onClick={onClickHandler}
      >
        {!!Icon && <span className="navbar__item__icon">{!!Icon && <Icon />}</span>}
        {!!label && <span className="navbar__item__label">{label}</span>}
      </button>
      {children && (
        <DropdownMenu
          className={className}
          dropdownMaxHeight={dropdownMaxHeight}
          onClickClose={dropDownOnClickClose}
          offset={dropdownOffset}
          anchorRef={anchorElement}
        >
          {children}
        </DropdownMenu>
      )}
    </li>
  );
};

export default NavItem;
