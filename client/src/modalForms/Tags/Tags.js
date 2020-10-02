import React, { useState, useEffect, useContext } from "react";
import TextInput from "components/TextInput/TextInput";
import Button from "components/Button/Button";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import TagButton from "components/Tag/TagButton";
import "./Tags.scss";
import fetchData from "helper/fetchData";
import PropTypes from "prop-types";
import LoadingOverlay from "components/LoadingOverlay/LoadingOverlay";
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
		const getBoardTags = async () => {
			const { data } = await fetchData({
				method: "GET",
				url: `/board/${boardId}/tag/`,
				token: true,
				setLoading: setTagLoading,
			});
			if (!!data) {
				const { tags } = data;
				setBoardTags(createInitalTagValues(tags));
			}
		};
		getBoardTags();
		return () => {};
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
		if(isAuthorized()) {
			setInputTagName(boardTags[index].name);
			setSelectedColor(boardTags[index].color);
		}
	};

	const createNewTag = async () => {
		if (selectedColor !== "" && inputTagName !== "") {
			const indexOfTag = boardTags.findIndex((tag) => tag.color === selectedColor);
			let tagId = "";

			let requestURL = "";
			if (boardTags[indexOfTag].id === "") requestURL = `/board/${boardId}/tag`
			else requestURL = `/board/${boardId}/tag/${boardTags[indexOfTag].id}`

			const { data } = await fetchData({
				method: "POST",
				url: requestURL,
				token: true,
				payload: {
					name: inputTagName,
					colorCode: selectedColor,
				},
			});
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
			const { status } = await fetchData({
				method: "DELETE",
				url: `/board/${boardId}/tag/${boardTags[indexOfTag].id}`,
				token: true,
			});
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
								classes={["check-btn"]}
								disabled={!inputTagName || !selectedColor}
								clicked={createNewTag}
							>
								<CheckIcon />
							</Button>
							<Button disabled={canDeleteTag()} clicked={deleteTag}>
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
