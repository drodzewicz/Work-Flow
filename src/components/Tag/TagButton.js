import React, { useRef } from "react";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import "./TagButton.scss";
import Tooltip from "components/Tooltip/Tooltip";

const TagButton = ({ clicked, showIcon, color, name, selected }) => {
	const anchorEl = useRef();

	return (
		<>
			<button
				type="button"
				onClick={clicked}
				className={`color-tile ${color} ${selected ? "selected" : ""}`}
				ref={anchorEl}
			>
				{showIcon && <LocalOfferIcon />}
			</button>
			{name && (
				<Tooltip offset={{ x: 0, y: 310 }} anchorEl={anchorEl}>
					<span>{name}</span>
				</Tooltip>
			)}
		</>
	);
};

export default TagButton;
