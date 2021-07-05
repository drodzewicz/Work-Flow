import React from "react";
import "./TagManager.scss";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { TagManagerProps } from ".";

const TagChoiceControll: React.FC<TagManagerProps> = ({
  tags,
  selectTagHandler,
}) => {

  return (
    <div className="tag-manager scrollbar">
      {tags.map((tag) => (
        <button
          key={tag._id}
          type="button"
          onClick={() => selectTagHandler(tag)}
          className={`tag-manager__item tag-manager__item--${tag.color.toLowerCase()}`}>
          <span>{tag.name}</span>
          {tag.checked && <RemoveCircleOutlineIcon className="tag-manager__item__remove-icon" />}
        </button>
      ))}
    </div>
  );
};

export default TagChoiceControll;
