import React, { useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import "./ExpandText.scss";
import { ExpandTextProps } from "./";

const ExpandText: React.FC<ExpandTextProps> = ({ title, children, isOpen = false, className }) => {
  const [show, setShow] = useState(isOpen);

  const toggleExpand = () => {
    setShow((isOpen) => !isOpen);
  };

  return (
    <div className={`expand-text ${className || ""}`}>
      <div className="expand-text__header">
        <h2 className="expand-text__header__title">{title}</h2>
        {children !== "" && (
          <ArrowDropDownIcon
            onClick={toggleExpand}
            className={`expand-text__header__icon ${show ? "expand-text__header__icon--open" : ""}`}
          />
        )}
      </div>
      <div className={`expand-text__content ${show ? "" : "expand-text__content--close"}`}>
        {children}
      </div>
    </div>
  );
};

export default ExpandText;
