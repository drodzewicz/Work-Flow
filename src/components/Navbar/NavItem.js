import React, { useRef } from "react";
import "./NavItem.scss";
import PropTypes from "prop-types";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";

const NavItem = ({ icon, navName, children, clicked, classes, offset, dropDownOnClickClose }) => {
	const anchorElement = useRef();

	return (
		<li className={`nav-item ${classes.join(" ")}`}>
			<button className="icon-button" ref={anchorElement} onClick={clicked}>
				{!!icon && icon}
				<span>{navName}</span>
			</button>
			{children && (
				<DropdownMenu
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
	dropDownOnClickClose: true,
};

NavItem.propTypes = {
	toggleFunction: PropTypes.func,
	classes: PropTypes.arrayOf(PropTypes.string),
	dropDownOnClickClose: PropTypes.bool,
};

export default NavItem;
