import React, { useEffect, useState } from "react";
import "./DropdownMenu.scss";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PropTypes from "prop-types";
import Portal from "HOC/Portal";
import useWindowSize from "Hooks/useWindowSize";

const DropdownMenu = ({ classes, children, anchorEl }) => {
	const [width] = useWindowSize();
	const [cords, setCords] = useState({});
	const [show, setShow] = useState(false);

	const openMenu = () => {
		// event.stopPropagation();
		const rect = anchorEl.current.getBoundingClientRect();
		setCords({
			left: rect.x + rect.width / 2,
			top: rect.y + window.scrollY,
		});
		setShow(true);
	};

	useEffect(() => {
		const dropDownMenuAnchorElement = anchorEl.current;
		dropDownMenuAnchorElement.addEventListener("click", openMenu);

		if (show) {
			setShow(false);
		}
		return () => {
			dropDownMenuAnchorElement.removeEventListener("click", openMenu);
		};
	}, [width]);

	const closeMenuClickHandler = () => {
		setShow(false);
	};

	if (show) {
		return (
			<Portal mountTo="root-modal">
				<ClickAwayListener onClickAway={closeMenuClickHandler}>
					<div
						style={{ top: cords.top, left: cords.left }}
						className={`drop-down-menu ${classes.join(" ")}`}
					>
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
	} else {
		return null;
	}
};

DropdownMenu.defaultProps = {
	classes: [""],
};

DropdownMenu.propTypes = {
	classes: PropTypes.arrayOf(PropTypes.string),
	children: PropTypes.node.isRequired,
};

export default DropdownMenu;
