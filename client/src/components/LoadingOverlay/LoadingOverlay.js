import React, { useContext } from "react";
import { ReactComponent as Spinner } from "assets/spinners/Rolling-1s-200px.svg";
import "./LoadingOverlay.scss";
import PropTypes from "prop-types";
import { UserContext } from "context/UserContext";

const LoadingOverlay = ({ show, opacity, classes, children, color }) => {
	const [{ theme }] = useContext(UserContext);
	let overlayColor = theme ? "255, 255, 255" : "71, 74, 75";
	if (!!color) {
		overlayColor = theme ? color.light : color.dark;
	}

	if (show) {
		return (
			<div
				className={`loading-overlay ${classes.join("")}`}
				style={{ backgroundColor: `rgba(${overlayColor}, ${opacity})` }}
			>
				<Spinner className="loading-overlay-spinner" />
			</div>
		);
	} else {
		return <div>{children}</div>;
	}
};

LoadingOverlay.defaultProps = {
	show: true,
	opacity: 1,
	classes: [""],
	color: undefined,
};

LoadingOverlay.propTypes = {
	show: PropTypes.bool,
	opacity: PropTypes.number,
	classes: PropTypes.arrayOf(PropTypes.string),
	color: PropTypes.shape({ light: PropTypes.string, dark: PropTypes.string }),
};

export default LoadingOverlay;
