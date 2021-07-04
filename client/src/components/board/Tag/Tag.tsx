import React from "react";
import "./Tag.scss";
import ClearIcon from "@material-ui/icons/Clear";
import { TagProps } from ".";

const Tag: React.FC<TagProps> = ({ colorCode, tagName, deleteTag }) => {
	return (
		<div className={`filter-tag ${colorCode.toLocaleLowerCase()}`}>
			<span className="tag-name">{tagName}</span>
			{deleteTag !== undefined && <ClearIcon className="delete-tag" onClick={deleteTag} />}
		</div>
	);
};

export default Tag;
