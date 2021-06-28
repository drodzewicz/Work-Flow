import React, { useState, useEffect, useContext } from "react";
import TextInput from "components/general/TextInput";
import Button from "components/general/Button/Button";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import TagButton from "components/board/Tag/TagButton";
import "./Tags.scss";
import { getBoardTags, createBoardTag, deleteBoardTag } from "service";
import LoadingOverlay from "components/layout/LoadingOverlay/LoadingOverlay";
import { UserContext } from "context/UserContext";
import { TagColors, TagI, BoardTag, TagsProps } from ".";
import { UserBoardRoles } from "types";

const Tags: React.FC<TagsProps> = ({ boardId }) => {
  const [selectedTag, setSelectedTag] = useState<{ color: TagColors | ""; name: string }>({
    color: "",
    name: "",
  });

  const [boardTags, setBoardTags] = useState<BoardTag[]>(
    Object.keys(TagColors).map((color) => ({ color: color as TagColors, name: "", saved: false }))
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
      console.log(data);
      if (!!data && _isMounted) {
        setBoardTags((tags) => {
          data.tags.forEach((tag: TagI) => {
            const tagIndex = tags.findIndex(({ color }) => color === tag.color);
            tags[tagIndex].name = tag.name;
            tags[tagIndex].saved = true;
          });
          return tags;
        });
      }
    };
    setupBoardTags();
    return () => {
      _isMounted = false;
    };
  }, [boardId]);

  const selectedTagHandler = async () => {
    const { color, name } = selectedTag;
    if (color === "" || name === "") return;
    let res = null;
    res = await createBoardTag({
      boardId,
      payload: { color, name },
    });
    if (!!res.data) {
      setBoardTags((tags) =>
        tags.map((tag) => (tag.color === color ? { ...tag, name, saved: true } : tag))
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
      setSelectedTag({ color, name: foundTag?.name || "" });
    }
  };

  const deleteTag = async () => {
    const { color: selectedColor } = selectedTag;
    if (selectedColor !== "") {
      const tagIndex = boardTags.findIndex((tag) => tag.color === selectedColor);
      const { status } = await deleteBoardTag({ boardId, color: selectedColor });
      if (status === 200)
        setBoardTags((tags) => {
          tags[tagIndex].name = "";
          tags[tagIndex].saved = false;
          setSelectedTag({ name: "", color: "" });
          return tags;
        });
    }
  };

  const canDeleteTag = () => {
    const tag = boardTags.find((tag) => tag.color === selectedTag.color);
    return !tag?.saved;
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
                value={selectedTag.name}
              />
              <Button
                className="check-btn"
                disabled={!selectedTag.name || !selectedTag.color}
                onClick={selectedTagHandler}>
                <CheckIcon />
              </Button>
              <Button disabled={canDeleteTag()} onClick={deleteTag}>
                <DeleteIcon />
              </Button>
            </div>
          )}
          <div className="tag-color-container">
            {boardTags.map(({ color, name }) => (
              <TagButton
                key={color}
                onClick={() => selectTag(color)}
                selected={selectedTag.color === color}
                showIcon={true}
                color={color.toLocaleLowerCase()}
                name={name}
              />
            ))}
          </div>
        </div>
      </LoadingOverlay>
    </div>
  );
};

export default Tags;
