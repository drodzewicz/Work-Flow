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
      {tags.map(({ _id, color, name, checked }) => (
        <button
          key={_id}
          type="button"
          onClick={() => selectTagHandler(_id)}
          className={`tag-manager__item tag-manager__item--${color.toLowerCase()}`}>
          <span>{name}</span>
          {checked && <RemoveCircleOutlineIcon className="tag-manager__item__remove-icon" />}
        </button>
      ))}
    </div>
  );
};

export default TagChoiceControll;
