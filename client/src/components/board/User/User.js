import React from "react";
import PropTypes from "prop-types";
import Image from "components/general/Image/Image";
import "./User.scss";

const User = ({ imageURL, username, children }) => {
	return (
    <div className="user-card">
      <Image className="user-avatar" src={imageURL} />
      <span className="username">{username}</span>
      <div className="user-buttons">{children}</div>
    </div>
  );
};

User.defaltProps = {
	children: null,
	imageURL: ""
};

User.propTypes = {
	imageURL: PropTypes.string,
	username: PropTypes.string.isRequired,
	children: PropTypes.node,
};

export default User;
