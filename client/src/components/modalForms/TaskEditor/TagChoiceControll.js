import React, { useRef } from "react";
import PropTypes from "prop-types";
import Button from "components/general/Button/Button";
import DropdownMenu from "components/general/DropdownMenu/DropdownMenu";
import DropdownMenuItem from "components/general/DropdownMenu/DropdownMenuItem";
import Tag from "components/board/Tag/Tag";

const TagChoiceControll = ({ availableTags, chosenBoardTags, removeTagFromList, addTagToList }) => {
  const tagChoiceButton = useRef();

  return (
    <div className="list-of-tags">
      <Button ref={tagChoiceButton} type="button">Choose Tags</Button>
      <DropdownMenu
        offset={{ x: -102, y: 35 }}
        scrollableAt={160}
        anchorEl={tagChoiceButton}
        className="tag-drop-down">
        {availableTags
          .filter(({ _id: tagId }) => chosenBoardTags.findIndex(({ _id }) => _id === tagId) < 0)
          .map(({ _id, colorCode, name }, index) => (
            <div key={_id} onClick={() => addTagToList(_id)} className={`tag-item ${colorCode}`}>
              {name}
            </div>
          ))}
      </DropdownMenu>
      <div className="chosen-tags-container">
        {chosenBoardTags.map(({ _id, colorCode, name }, index) => (
          <DropdownMenuItem key={_id}>
            <Tag deleteTag={() => removeTagFromList(index)} tagName={name} colorCode={colorCode} />
          </DropdownMenuItem>
        ))}
      </div>
    </div>
  );
};

TagChoiceControll.propTypes = {
  availableTags: PropTypes.array.isRequired,
  chosenBoardTags: PropTypes.array.isRequired,
  removeTagFromList: PropTypes.func.isRequired,
  addTagToList: PropTypes.func.isRequired,
};

export default TagChoiceControll;
