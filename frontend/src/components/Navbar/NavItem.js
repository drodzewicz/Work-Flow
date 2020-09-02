import React, { useRef } from "react";
import "./NavItem.scss";
import PropTypes from "prop-types";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";

const NavItem = ({
	icon,
	navName,
	children,
	clicked,
	classes,
	offset,
	dropDownOnClickClose,
	dropDownScrollableAt,
}) => {
	const anchorElement = useRef();

	return (
		<li className={`nav-item ${classes.join(" ")}`}>
			<button className="icon-button" ref={anchorElement} onClick={clicked}>
				{!!icon && icon}
				<span>{navName}</span>
			</button>
			{children && (
				<DropdownMenu
					scrollableAt={dropDownScrollableAt}
					onClickClose={dropDownOnClickClose}
					offset={offset}
					classes={classes}
					anchorEl={anchorElement}
				>
					{children}
				</DropdownMenu>
			)}
		</li>
	);
};

NavItem.defaultProps = {
	classes: [""],
	icon: null,
	children: null,
	navName: "",
	offset: undefined,
	dropDownOnClickClose: true,
	clicked: undefined,
};

NavItem.propTypes = {
	icon: PropTypes.element,
	navName: PropTypes.string,
	toggleFunction: PropTypes.func,
	children: PropTypes.node,
	clicked: PropTypes.func,
	offset: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
	classes: PropTypes.arrayOf(PropTypes.string),
	dropDownOnClickClose: PropTypes.bool,
};

export default NavItem;
