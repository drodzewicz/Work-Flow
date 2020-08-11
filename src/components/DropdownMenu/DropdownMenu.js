import React from "react";
import "./DropdownMenu.scss";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PropTypes from "prop-types";

const DropdownMenu = ({ classes, children, closeMenu }) => {
	return (
		<ClickAwayListener onClickAway={closeMenu}>
			<div className={`drop-down-menu ${classes.join(" ")}`}>
				{Array.isArray(children) ? (
					children
						.filter((node) => node)
						.map((node) => (
							<div key={"" + Math.random()} className="drop-down-menu-item">
								{node}
							</div>
						))
				) : (
					<div className="drop-down-menu-item">{children}</div>
				)}
			</div>
		</ClickAwayListener>
	);
};

DropdownMenu.defaultProps = {
	classes: [""],
};

DropdownMenu.propTypes = {
	classes: PropTypes.arrayOf(PropTypes.string),
	children: PropTypes.node.isRequired,
	closeMenu: PropTypes.func.isRequired,
};

export default DropdownMenu;
