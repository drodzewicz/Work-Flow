import React, { PropsWithChildren, useState } from "react";

import { FaCaretDown } from "react-icons/fa";

import "./ExpandText.scss";

export interface ExpandTextProps {
  className?: string;
  title: string;
  isOpen?: boolean;
}

const ExpandText: React.FC<PropsWithChildren<ExpandTextProps>> = ({
  title,
  children,
  isOpen = false,
  className,
}) => {
  const [show, setShow] = useState(isOpen);

  const toggleExpand = () => setShow((isOpen) => !isOpen);

  return (
    <div className={`expand-text ${className || ""}`}>
      <div className="expand-text__header">
        <h2 className="expand-text__header__title">{title}</h2>
        {children !== "" && (
          <FaCaretDown
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