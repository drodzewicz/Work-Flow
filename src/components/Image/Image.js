import React from "react";
import PropTypes from "prop-types";

const Image = ({ imageLink, errorImage, classes }) => {

  const fallback = (e) => {
    e.target.src = errorImage;
  };

  return (
    <img
      className={`custom image ${classes.join(" ")}`}
      alt="custom"
      src={imageLink}
      onError={fallback}
    />
  )
};
Image.defaultProps = {
  errorImage: "https://i.stack.imgur.com/l60Hf.png",
  classes: [""]
}

Image.propTypes = {
  imageLink: PropTypes.string.isRequired,
  errorImage: PropTypes.string,
  classes: PropTypes.arrayOf(PropTypes.string)
}


export default Image
