import React from "react";
import PropTypes from "prop-types";
import "./Backdrop.scss";

const Backdrop = ({ show, clicked }) => (
  <div
    onClick={clicked}
    role="presentation"
    className={show ? "backdrop backdrop-open" : "backdrop"}
  ></div>
);

Backdrop.defaultProps = {
  clicked: undefined
}

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func,
};

export default Backdrop;