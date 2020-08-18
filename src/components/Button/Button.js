import React from "react";
import "./Button.scss";
import PropTypes from "prop-types";

const Button = ({ children, classes, clicked, type, disabled, refEl }) => {
	return (
		<button
			ref={refEl}
			disabled={disabled}
			type={type}
			onClick={clicked}
			className={`btn-primary ${classes.join(" ")}`}
		>
			{children}
		</button>
	);
};

Button.defaultProps = {
	classes: [""],
	clicked: null,
	type: "button",
	disabled: false,
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	clicked: PropTypes.func,
	disabled: PropTypes.bool,
	type: PropTypes.string,
	classes: PropTypes.arrayOf(PropTypes.string),
};

export default Button;
