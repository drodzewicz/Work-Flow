import React, { useRef, useState, useEffect } from "react";
import "./Tooltip.scss";
import Portal from "HOC/Portal";
import PropTypes from "prop-types";

function Tooltip({ classes, children, anchorEl, offset, index }) {
	const [showTooltip, setShowTooltip] = useState(false);
	const [cords, setCords] = useState({left: 0, top: 0});
	const toolTipRef = useRef();
	let waitTimeBeforeRender = 0;

	useEffect(() => {
		const tooltipAnchorElement = anchorEl.current;
		tooltipAnchorElement.addEventListener("mouseenter", showToolTiphandler);
		tooltipAnchorElement.addEventListener("mouseleave", hideToolTipHandler);

		return () => {
			if (waitTimeBeforeRender) clearTimeout(waitTimeBeforeRender);
			tooltipAnchorElement.removeEventListener("mouseenter", showToolTiphandler);
			tooltipAnchorElement.removeEventListener("mouseleave", hideToolTipHandler);
		};
	}, [index]);

	const showToolTiphandler = () => {
		waitTimeBeforeRender = setTimeout(() => {
			setShowTooltip(true);
			const rect = anchorEl.current.getBoundingClientRect();
			const toolTipContainerWith = toolTipRef.current.getBoundingClientRect().width;
			setCords({
				left: rect.x + (rect.width / 2) - (toolTipContainerWith / 2) + offset.x,
				top: rect.y + 30 + offset.y,
			});
		}, 500);
		
	};

	const hideToolTipHandler = () => {
		if (waitTimeBeforeRender) clearTimeout(waitTimeBeforeRender);
		setShowTooltip(false);
	};
	if (showTooltip) {
		return (
			<Portal mountTo="root-menu">
				<div
					ref={toolTipRef}
					style={{ top: cords.top, left: cords.left }}
					className={`tool-tip-wrapper ${classes.join(" ")}`}
				>
					{children}
				</div>
			</Portal>
		);
	} else {
		return null;
	}
}
Tooltip.defaultProps = {
	classes: [""],
	offset: { x: 0, y: 0 },
};

Tooltip.propTypes = {
	classes: PropTypes.arrayOf(PropTypes.string),
	anchorEl: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	]).isRequired,
	children: PropTypes.node.isRequired,
	offset: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
};

export default Tooltip;
