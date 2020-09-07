import React, { useContext } from "react";
import { ReactComponent as Spinner } from "assets/spinners/Rolling-1s-200px.svg";
import "./LoadingOverlay.scss";
import PropTypes from "prop-types";
import { UserContext } from "context/UserContext";

const LoadingOverlay = ({ show, opacity }) => {
	const [{ theme }] = useContext(UserContext);
	const overlayColor = theme ? "255, 255, 255" : "71, 74, 75";

	if (show) {
		return (
			<div className="loading-overlay" style={{ backgroundColor: `rgba(${overlayColor}, ${opacity})` }}>
				<Spinner className="loading-overlay-spinner" />
			</div>
		);
	} else {
		return null;
	}
};

LoadingOverlay.defaultProps = {
	show: true,
	opacity: 1,
};

LoadingOverlay.propTypes = {
	show: PropTypes.bool,
	opacity: PropTypes.number,
};

export default LoadingOverlay;
