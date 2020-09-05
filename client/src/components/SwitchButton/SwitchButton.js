import React from "react";
import "./SwitchButton.scss";
import PropTypes from "prop-types";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness3Icon from "@material-ui/icons/Brightness3";

const SwitchButton = ({ toggle, isOn }) => {
	return (
		<div onClick={toggle} className={`switch-button ${isOn ? "switch-on" : ""}`}>
			<div className="circle">{isOn ? <Brightness3Icon /> : <Brightness7Icon />}</div>
		</div>
	);
};

SwitchButton.propTypes = {
	toggle: PropTypes.func.isRequired,
	isOn: PropTypes.bool.isRequired,
};

export default SwitchButton;
