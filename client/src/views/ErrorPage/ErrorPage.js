import React from "react";
import "./ErrorPage.scss";
import PropTypes from "prop-types";
import costam from "assets/images/drawkit-nature-man-colour.svg";

function ErrorPage({ errorCode }) {

  const translateErrorCode = () => {
    switch (errorCode) {
      case "400":
        return "BAD REQUEST";
      case "401":
        return "UNAUTHORIZED";
      case "403":
        return "FORBIDDEN";
      case "404":
        return "NOT FOUND";
      case "500":
        return "INTERNAL SERVER ERROR";
      case "502":
        return "BAD GATEWAY";
    
      default:
        return "UKNOWN ERROR";
    }
  }

	return (
		<div className="error-page-wrapper">
      <div className="error-container">
      <img src={costam} alt="error-page-guy" id="error-page-image" />{" "}
			<h2 className="error-title">{`ERROR: ${errorCode}`}</h2>
			<p className="error-detail">{translateErrorCode()}</p>
      </div>
		</div>
	);
}

ErrorPage.defaultProps = {
	errorCode: "400",
};
ErrorPage.propTypes = {
	errorCode: PropTypes.string,
};

export default ErrorPage;
