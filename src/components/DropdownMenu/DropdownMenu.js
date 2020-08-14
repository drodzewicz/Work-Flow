import React from "react";
import "./DropdownMenu.scss";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PropTypes from "prop-types";
import Portal from "HOC/Portal";

const DropdownMenu = ({ classes, children, closeMenu, cords }) => {
	return (
		<Portal mountTo="root-modal">
		<ClickAwayListener onClickAway={closeMenu}>
			<div style={{top: cords.top, left: cords.left}} className={`drop-down-menu ${classes.join(" ")}`}>
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
		</Portal>
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
