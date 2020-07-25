import React, {useState} from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import "./ExpandText.scss";

const ExpandText = ({text, children, isOpen}) => {

  const [show, setShow] = useState(false);

  const toggleExpand = () => {
    setShow( open => !open);
  }

  return (
    <div className="expand-text-container">
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

export default ExpandText
