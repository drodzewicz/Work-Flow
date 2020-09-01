import React from "react";
import PropTypes from "prop-types";
import Image from "components/Image/Image";
import "./User.scss";

const User = ({ imageURL, username, children }) => {
	return (
		<div className="user-card">
			<Image classes={["user-avatar"]} imageURL={imageURL} />
			<span className="username">{username}</span>
			<div className="user-buttons">{children}</div>
		</div>
	);
};

User.defaltProps = {
	children: null,
};

User.propTypes = {
	imageURL: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	children: PropTypes.node,
};

export default User;
