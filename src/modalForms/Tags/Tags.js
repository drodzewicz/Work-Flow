import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Button from "components/Button/Button";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import "./Tags.scss";

const Tags = () => {
	const [inputTagName, setInputTagName] = useState("");
	const [selectedColor, setSelectedColor] = useState("");
	const [boardTags, setBoardTags] = useState([
		{ color: "red", id: "dwdw44545", name: "frontend" },
		{ color: "yellow", id: "", name: "" },
		{ color: "green", id: "", name: "" },
		{ color: "tiel", id: "fefef455", name: "new things" },
		{ color: "purple", id: "", name: "" },
		{ color: "majenta", id: "", name: "" },
		{ color: "pink", id: "", name: "" },
		{ color: "black", id: "", name: "" },
		{ color: "white", id: "f4565656532", name: "brand new fetures" },
	]);

	const handleTagNameInput = (event) => {
		setInputTagName(event.target.value);
	};

	const selectTag = (index) => {
		setInputTagName(boardTags[index].name);
		setSelectedColor(boardTags[index].color);
	};

	const createNewTag = () => {
		if (selectedColor !== "" && inputTagName !== "") {
			const indexOfTag = boardTags.findIndex((tag) => tag.color === selectedColor);
			if (boardTags[indexOfTag].id === "") {
				console.log("create new tag");
			} else {
				console.log("update tag");
			}
			setBoardTags((tags) => {
				const tempTags = [...tags];
				tempTags[indexOfTag].name = inputTagName;
				tempTags[indexOfTag].id = inputTagName;
				return tempTags;
			});
		}
	};
	const deleteTag = () => {
		if (selectedColor !== "" && inputTagName !== "") {
			const indexOfTag = boardTags.findIndex((tag) => tag.color === selectedColor);
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
		if(indexOfTag > -1){
			return boardTags[indexOfTag].id === "";
		}
		return true;
	}

	return (
		<div className="tag-form">
			<div className="tag-name-input-wrappper">
				<TextField
					onChange={handleTagNameInput}
					label={"tag name"}
					name={"tagName"}
					type={"text"}
					variant="outlined"
					value={inputTagName}
				/>
				<Button disabled={inputTagName === "" || selectedColor === ""} clicked={createNewTag}>
					<CheckIcon />
				</Button>
				<Button disabled={canDeleteTag()} clicked={deleteTag}>
					<DeleteIcon />
				</Button>
			</div>
			<div className="tag-color-container">
				{boardTags.map(({ color, id }, index) => (
					<button
						key={color}
						onClick={() => selectTag(index)}
						className={`color-tile ${color} ${selectedColor === color ? "selected" : ""}`}
					>
						{id !== "" && <LocalOfferIcon />}
					</button>
				))}
			</div>
		</div>
	);
};

export default Tags;
