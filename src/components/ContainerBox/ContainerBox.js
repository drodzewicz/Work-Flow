import React from "react";
import "./ContainerBox.scss";
import PropTypes from "prop-types";

const ContainerBox = ({children}) => {
  return (
    <div className="container-box">
      {children}
    </div>
  );
};

ContainerBox.propTypes = {
  children: PropTypes.node.isRequired
}

export default ContainerBox;