import React from "react";
import "./Button.scss";
import PropTypes from "prop-types";

const Button = ({children, classes, clicked}) => {
  return (
    <div onClick={clicked} className={classes.join(" ")}>
      {children}
    </div>
  ); 
};

Button.defaultProps = {
  classes: ["btn-primary"]
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  clicked: PropTypes.func,
  classes: PropTypes.arrayOf(PropTypes.string)
}

export default Button;