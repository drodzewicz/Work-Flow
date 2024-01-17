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
        <h2 className="expand-text__title">{title}</h2>
        {children !== "" && (
          <button className="expand-text__expand-btn" aria-expanded={show} onClick={toggleExpand}>
            <FaCaretDown />
          </button>
        )}
      </div>
      <div
        aria-expanded={show}
        className={`expand-text__content ${show ? "" : "expand-text__content--hidden"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ExpandText;
