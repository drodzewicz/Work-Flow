import React, { useState, useEffect, useContext } from "react";
import { TextField } from "components/general/TextInput";
import Button from "components/general/Button";
import { FaTrashAlt, FaCheck } from "react-icons/fa";
import TagButton from "components/board/Tag/TagButton";
import "./Tags.scss";
import { getBoardTags, createBoardTag, deleteBoardTag, updateBoardTag } from "service";
import LoadingOverlay from "components/layout/LoadingOverlay";
import { UserContext } from "context/UserContext";
import { TagsProps } from ".";
import { TagI, TagColors, UserBoardRoles } from "types/general";

const Tags: React.FC<TagsProps> = ({ boardId }) => {
  const [selectedTag, setSelectedTag] = useState<{
    color: TagColors | "";
    name: string;
    _id: string;
  }>({
    color: "",
    name: "",
    _id: "",
  });

  const [boardTags, setBoardTags] = useState<TagI[]>(
    Object.keys(TagColors).map((color) => ({ color: color as TagColors, name: "", _id: "" }))
  );
  const [isTagLoading, setTagLoading] = useState<boolean>(true);
  const {
    userState: { currentBoard },
  } = useContext(UserContext);

  useEffect(() => {
    let _isMounted = true;

    const setupBoardTags = async () => {
      const { data } = await getBoardTags({ boardId });
      if (_isMounted) setTagLoading(false);
      if (!!data && _isMounted) {
        setBoardTags((tags) => {
          return tags.map((tag) => {
            const foundTag = data.tags.find(({ color }) => color === tag.color);
            if (foundTag) return foundTag;
            return tag;
          });
        });
      }
    };
    setupBoardTags();
    return () => {
      _isMounted = false;
    };
  }, [boardId]);

  const selectedTagHandler = async () => {
    const { color, name, _id } = selectedTag;
    if (color === "" || name === "") return;
    let res = null;
    if (!_id) {
      res = await createBoardTag({
        boardId,
        payload: { color, name },
      });
    } else {
      res = await updateBoardTag({
        boardId,
        tagId: _id,
        payload: { color, name },
      });
    }
    if (!!res.data) {
      const { tag: savedTag } = res.data;
      setSelectedTag({ ...savedTag });
      setBoardTags((tags) =>
        tags.map((tag) =>
          tag.color === color ? { ...tag, name: savedTag.name, _id: savedTag._id } : tag
        )
      );
    }
  };

  const handleTagNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/\n/g, "");
    if (inputValue.length <= 30) {
      setSelectedTag((selectedTag) => ({ ...selectedTag, name: inputValue }));
    }
  };

  const isAuthorized = () => {
    return currentBoard.role === UserBoardRoles.ADMIN || currentBoard.role === UserBoardRoles.OWNER;
  };

  const selectTag = (color: TagColors) => {
    if (isAuthorized()) {
      const foundTag = boardTags.find(({ color: boardColr }) => boardColr === color);
      setSelectedTag({ color, name: foundTag?.name || "", _id: foundTag?._id || "" });
    }
  };

  const deleteTag = async () => {
    const { _id: selectedTagId } = selectedTag;
    if (selectedTagId !== "") {
      const tagIndex = boardTags.findIndex((tag) => tag._id === selectedTagId);
      const { status } = await deleteBoardTag({ boardId, tagId: selectedTagId });
      if (status === 200)
        setBoardTags((tags) => {
          tags[tagIndex] = { ...tags[tagIndex], _id: "", name: "" };
          setSelectedTag({ name: "", color: "", _id: "" });
          return tags;
        });
    }
  };

  const canDeleteTag = () => {
    const tag = boardTags.find((tag) => tag.color === selectedTag.color);
    return !tag?._id;
  };

  return (
    <LoadingOverlay show={isTagLoading} opacity={0}>
      <div className="tag-form">
        {isAuthorized() && (
          <div className="tag-form__controls">
            <TextField
              className="tag-form__controls__input"
              onChange={handleTagNameInput}
              label="tag name"
              name="tagName"
              type="text"
              value={selectedTag.name}
            />
            <Button
              className="tag-form__controls__btn"
              disabled={!selectedTag.name || !selectedTag.color}
              onClick={selectedTagHandler}>
              <FaCheck />
            </Button>
            <Button
              className="tag-form__controls__btn"
              disabled={canDeleteTag()}
              onClick={deleteTag}>
              <FaTrashAlt />
            </Button>
          </div>
        )}
        <div className="tag-form__tag-container">
          {boardTags.map(({ color, name, _id }) => (
            <TagButton
              key={color}
              onClick={() => selectTag(color)}
              selected={selectedTag.color === color}
              showIcon={_id !== ""}
              color={color.toLocaleLowerCase()}
              name={name}
            />
          ))}
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default Tags;
