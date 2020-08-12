import React, { useState } from "react";
import "./Tag.scss";
import PropTypes from "prop-types";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from '@material-ui/icons/Clear';

const Tag = ({ colorCode, tagName, deleteTag, selectTag }) => {

	return <div onClick={selectTag} className={`filter-tag ${colorCode}`}>
		<span className="tag-name">{tagName}</span>
		<ClearIcon className="delete-tag" onClick={deleteTag} />
	</div>;
};

Tag.propTypes = {
	colorCode: PropTypes.string.isRequired,
	tagName: PropTypes.string.isRequired,
};

export default Tag;
