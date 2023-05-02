import React from "react";
import "./Tag.scss";
import { TagProps } from ".";

const Tag: React.FC<TagProps> = ({ colorCode, tagName }) => {
	return (
		<div className={`filter-tag ${colorCode.toLocaleLowerCase()}`}>
			<span className="tag-name">{tagName}</span>
		</div>
	);
};

export default Tag;
