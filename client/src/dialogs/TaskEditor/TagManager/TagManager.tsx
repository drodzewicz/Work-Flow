import React from "react";
import "./TagManager.scss";
import { TagManagerProps } from ".";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";

const TagChoiceControll: React.FC<TagManagerProps> = ({ tags, selectTagHandler }) => {
  return (
    <div className="tag-manager scrollbar">
      {tags.map((tag) => (
        <button
          key={tag._id}
          type="button"
          onClick={() => selectTagHandler(tag)}
          className={`tag-manager__item tag-manager__item--${tag.color.toLowerCase()} ${
            tag.checked ? "checked" : ""
          }`}>
          <span>{tag.name}</span>
          {tag.checked ? (
            <FaRegCheckSquare className="tag-manager__item__check-icon" />
          ) : (
            <FaRegSquare className="tag-manager__item__check-icon" />
          )}
        </button>
      ))}
      {tags.length < 1 && (
        <i className="tag-manager__no-content-msg">There are no tags in this project</i>
      )}
    </div>
  );
};

export default TagChoiceControll;
