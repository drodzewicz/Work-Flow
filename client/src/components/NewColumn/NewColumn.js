import React, { useState } from "react";
import "./NewColumn.scss";
import PropTypes from "prop-types";
import fetchData from "helper/fetchData";

// import { ws } from "socket";
import { emitWS } from "helper/socketData";

const NewColumn = ({ boardId }) => {
	const [columnName, setColumnName] = useState("");

	const handleNewColumnChange = (event) => {
		const newColumnName = event.target.value;
		if (newColumnName.length < 20) {
			setColumnName(newColumnName);
		}
	};

	const createNewColumn = async (event) => {
		if (event.key === "Enter" && columnName.trim() !== "") {
			emitWS({
				roomId: boardId,
				eventName: "createNewColumn",
				token: true,
				payload: { name: columnName },
				res: (response) => {
					console.log("tetsing res: ", response);
				},
			});
			setColumnName("");
		}
	};
	return (
		<div className="add-new-column">
			<input
				onKeyDown={createNewColumn}
				value={columnName}
				onChange={handleNewColumnChange}
				type="text"
				placeholder="+ new column"
			/>
		</div>
	);
};

NewColumn.propTypes = {
	boardId: PropTypes.string.isRequired,
};

export default NewColumn;
