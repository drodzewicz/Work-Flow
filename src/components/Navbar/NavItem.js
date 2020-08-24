import React, { useRef } from "react";
import "./NavItem.scss";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";

const NavItem = ({ icon, navName, children, clicked, classes, offset }) => {
	const anchorElement = useRef();

	return (
		<li className={`nav-item ${classes.join(" ")}`}>
			<button className="icon-button" ref={anchorElement} onClick={clicked}>
				{!!icon && icon}
				<span>{navName}</span>
			</button>
			{children && (
				<DropdownMenu offset={offset} classes={classes} anchorEl={anchorElement}>
					{children}
				</DropdownMenu>
			)}
		</li>
	);
};

NavItem.defaultProps = {
	classes: [""],
};

NavItem.propTypes = {
	toggleFunction: PropTypes.func,
	classes: PropTypes.arrayOf(PropTypes.string),
};

export default NavItem;
