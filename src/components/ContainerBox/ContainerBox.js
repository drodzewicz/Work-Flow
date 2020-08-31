import React from "react";
import "./ContainerBox.scss";
import PropTypes from "prop-types";

const ContainerBox = ({ children, classes }) => {
	return <div className={`container-box ${classes.join([" "])}`}>{children}</div>;
};

ContainerBox.defaultProps = {
	classes: [""],
};

ContainerBox.propTypes = {
	children: PropTypes.node.isRequired,
	classes: PropTypes.arrayOf(PropTypes.string),
};

export default ContainerBox;
