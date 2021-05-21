import React, { useState, useEffect, useContext } from "react";
import TextInput from "components/general/TextInput";
import Button from "components/general/Button/Button";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import TagButton from "components/board/Tag/TagButton";
import "./Tags.scss";
import { getBoardTags, updateBoardTag, createBoardTag, deleteBoardTag } from "service";
import PropTypes from "prop-types";
import LoadingOverlay from "components/layout/LoadingOverlay/LoadingOverlay";
import { UserContext } from "context/UserContext";

const colorList = ["red", "yellow", "green", "tiel", "purple", "majenta", "pink", "black", "white"];

const createInitalTagValues = (boardColors) => {
  const initialTagValues = [];
  colorList.forEach((color) => {
    const foundTag = boardColors.find(({ colorCode }) => colorCode === color);
    if (foundTag === undefined) initialTagValues.push({ id: "", color, name: "" });
    else initialTagValues.push({ id: foundTag._id, color, name: foundTag.name });
  });
  return initialTagValues;
};

const Tags = ({ boardId }) => {
  const [inputTagName, setInputTagName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [boardTags, setBoardTags] = useState([]);
  const [isTagLoading, setTagLoading] = useState(true);
  const [{ currentBoard }] = useContext(UserContext);

  useEffect(() => {
    let _isMounted = true;

    const getBoardTagss = async () => {
      const { data } = await getBoardTags({ boardId });
      if (_isMounted) setTagLoading(false);
      if (!!data && _isMounted) {
        const { tags } = data;
        setBoardTags(createInitalTagValues(tags));
      }
    };
    getBoardTagss();
    return () => {
      _isMounted = false;
    };
  }, [boardId]);

  const handleTagNameInput = (event) => {
    const inputValue = event.target.value.replace(/\n/g, "");
    if (inputValue.length <= 30) {
      setInputTagName(inputValue);
    }
  };

  const isAuthorized = () => {
    return currentBoard.role === "admin" || currentBoard.role === "owner";
  };

  const selectTag = (index) => {
    if (isAuthorized()) {
      setInputTagName(boardTags[index].name);
      setSelectedColor(boardTags[index].color);
    }
  };

  const createNewTag = async () => {
    if (selectedColor !== "" && inputTagName !== "") {
      const indexOfTag = boardTags.findIndex((tag) => tag.color === selectedColor);
      let tagId = "";

      let response;
      if (boardTags[indexOfTag].id === "") {
        response = await createBoardTag({
          boardId,
          payload: {
            name: inputTagName,
            colorCode: selectedColor,
          },
        });
      } else {
        response = await updateBoardTag({
          boardId,
          tagId: boardTags[indexOfTag].id,
          payload: {
            name: inputTagName,
            colorCode: selectedColor,
          },
        });
      }
      const { data } = response;

      if (!!data) tagId = data.tag._id;

      if (tagId !== "")
        setBoardTags((tags) => {
          const tempTags = [...tags];
          tempTags[indexOfTag].name = inputTagName;
          tempTags[indexOfTag].id = tagId;
          return tempTags;
        });
    }
  };
  const deleteTag = async () => {
    if (selectedColor !== "" && inputTagName !== "") {
      const indexOfTag = boardTags.findIndex((tag) => tag.color === selectedColor);
      const { status } = await deleteBoardTag({ boardId, tagId: boardTags[indexOfTag].id });
      if (status === 200)
        setBoardTags((tags) => {
          const tempTags = [...tags];
          tempTags[indexOfTag].name = "";
          tempTags[indexOfTag].id = "";
          setInputTagName("");
          setSelectedColor("");
          return tempTags;
        });
    }
  };

  const canDeleteTag = () => {
    const indexOfTag = boardTags.findIndex((tag) => tag.color === selectedColor);
    if (indexOfTag > -1) {
      return boardTags[indexOfTag].id === "";
    }
    return true;
  };

  return (
    <div className="tag-form-wrapper">
      <LoadingOverlay show={isTagLoading} opacity={0}>
        <div className="tag-form">
          {isAuthorized() && (
            <div className="tag-name-input-wrappper">
              <TextInput
                onChange={handleTagNameInput}
                label={"tag name"}
                name={"tagName"}
                type={"text"}
                value={inputTagName}
              />
              <Button
                className="check-btn"
                disabled={!inputTagName || !selectedColor}
                onClick={createNewTag}>
                <CheckIcon />
              </Button>
              <Button disabled={canDeleteTag()} onClick={deleteTag}>
                <DeleteIcon />
              </Button>
            </div>
          )}
          <div className="tag-color-container">
            {boardTags.map(({ color, id, name }, index) => (
              <TagButton
                key={color}
                clicked={() => selectTag(index)}
                selected={selectedColor === color}
                showIcon={id !== ""}
                color={color}
                name={name}
              />
            ))}
          </div>
        </div>
      </LoadingOverlay>
    </div>
  );
};

Tags.propTypes = {
  boardId: PropTypes.string.isRequired,
};

export default Tags;
