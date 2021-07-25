import React, { useRef } from "react";
import { FaTag } from "react-icons/fa";
import "./TagButton.scss";
import Tooltip from "components/general/Tooltip";
import { TagButtonProps } from ".";

const TagButton: React.FC<TagButtonProps> = ({ onClick, showIcon, color, name, selected }) => {
  const anchorEl = useRef(null);

  return (
    <div className="tag-button__wrapper">
      <button
        type="button"
        onClick={onClick}
        className={`tag-button ${color} ${selected ? "tag-button--selected" : ""}`}
        ref={anchorEl}>
        {showIcon && <FaTag />}
      </button>
      {name && (
        <Tooltip offset={{ x: 0, y: 20 }} anchorEl={anchorEl}>
          <span>{name}</span>
        </Tooltip>
      )}
    </div>
  );
};

export default TagButton;
