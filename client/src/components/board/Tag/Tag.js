import React from "react";
import "./Tag.scss";
import PropTypes from "prop-types";
import ClearIcon from "@material-ui/icons/Clear";

const Tag = ({ colorCode, tagName, deleteTag }) => {
	return (
		<div className={`filter-tag ${colorCode}`}>
			<span className="tag-name">{tagName}</span>
			{deleteTag !== undefined && <ClearIcon className="delete-tag" onClick={deleteTag} />}
		</div>
	);
};

Tag.defaultProps = {
	deleteTag: undefined
}

Tag.propTypes = {
	colorCode: PropTypes.string.isRequired,
	tagName: PropTypes.string.isRequired,
	deleteTag: PropTypes.func,
};

export default Tag;
