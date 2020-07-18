import React from "react";
import "./Button.scss";
import PropTypes from "prop-types";

const Button = ({children, classes}) => {
  return (
    <div className={classes.join(" ")}>
      {children}
    </div>
  ); 
};

Button.defaultProps = {
  classes: ["btn-primary"]
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.arrayOf(PropTypes.string)
}

export default Button;