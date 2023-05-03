import React, { useRef } from "react";

import { TagButtonProps } from "./types";

import { FaTag } from "react-icons/fa";

import Tooltip from "@/components/general/Tooltip";

import "./TagButton.scss";

const TagButton: React.FC<TagButtonProps> = ({ onClick, showIcon, color, name, selected }) => {
  const anchorEl = useRef(null);

  return (
    <div className="tag-button__wrapper">
      <button
        type="button"
        onClick={onClick}
        className={`tag-button ${color} ${selected ? "tag-button--selected" : ""}`}
        ref={anchorEl}
      >
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
