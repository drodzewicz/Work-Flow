import React, { useRef } from "react";
import PropTypes from "prop-types";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import "./TagButton.scss";
import Tooltip from "components/general/Tooltip/Tooltip";

const TagButton = ({ clicked, showIcon, color, name, selected }) => {
	const anchorEl = useRef();

	return (
		<div className="color-tile-wrapper">
			<button
				type="button"
				onClick={clicked}
				className={`color-tile ${color} ${selected ? "selected" : ""}`}
				ref={anchorEl}
			>
				{showIcon && <LocalOfferIcon />}
			</button>
			{name && (
				<Tooltip offset={{ x: 0, y: 20 }} anchorEl={anchorEl}>
					<span>{name}</span>
				</Tooltip>
			)}
		</div>
	);
};

TagButton.propTypes = {
	clicked: PropTypes.func.isRequired,
	showIcon: PropTypes.bool.isRequired,
	color: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired,
};

export default TagButton;
