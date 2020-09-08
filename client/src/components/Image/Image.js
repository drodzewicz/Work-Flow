import React from "react";
import PropTypes from "prop-types";
import defaultAvatar from "assets/images/default_avatar.png";

const Image = ({ imageURL, errorImage, classes }) => {
	const fallback = (e) => {
		e.target.src = errorImage;
	};

	return <img className={`custom image ${classes.join(" ")}`} alt="" src={imageURL} onError={fallback} />;
};
Image.defaultProps = {
	imageURL: "",
	errorImage: defaultAvatar,
	classes: [""],
};

Image.propTypes = {
	imageURL: PropTypes.string,
	errorImage: PropTypes.string,
	classes: PropTypes.arrayOf(PropTypes.string),
};

export default Image;
