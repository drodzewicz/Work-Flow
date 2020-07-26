import React, {useState} from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import "./ExpandText.scss";
import PropTypes from "prop-types";

const ExpandText = ({text, children, isOpen, classes}) => {

  const [show, setShow] = useState(isOpen);

  const toggleExpand = () => {
    setShow( open => !open);
  }

  return (
    <div className={`expand-text-container ${classes.join(" ")}`}>
      <div className="expand-text-header">
        <h2 className="text-title">{text}</h2>
        <ArrowDropDownIcon onClick={toggleExpand} className={`${show ? "open" : ""}`} />
      </div>
      <div className={`expand-content ${show ? "" : "close"}`}>
        {children}
      </div>
    </div>
  )
}
ExpandText.defaultProps = {
  classes: [""],
  isOpen: false
}

ExpandText.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.string),
  isOpen: PropTypes.bool,
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired

}

export default ExpandText
