import React, { useEffect, useState } from "react";
import "./DropdownMenu.scss";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PropTypes from "prop-types";
import Portal from "HOC/Portal";
import useWindowSize from "Hooks/useWindowSize";

const DropdownMenu = ({ classes, children, anchorEl, offset }) => {
	const [width] = useWindowSize();
	const [cords, setCords] = useState({});
	const [show, setShow] = useState(false);

	useEffect(() => {
		const dropDownMenuAnchorElement = anchorEl.current;

		const openMenu = () => {
			const rect = anchorEl.current.getBoundingClientRect();
			setCords({
				left: rect.x + rect.width + offset.x,
				top: rect.y + window.scrollY + offset.y,
			});
			setShow(true);
		};

		dropDownMenuAnchorElement.addEventListener("click", openMenu);

		setShow(false);
		return () => {
			dropDownMenuAnchorElement.removeEventListener("click", openMenu);
		};
	}, [width, anchorEl, offset]);

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
	offset: { x: 0, y: 0 },
};

DropdownMenu.propTypes = {
	classes: PropTypes.arrayOf(PropTypes.string),
	children: PropTypes.node.isRequired,
	offset: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
};

export default DropdownMenu;
