import React, { useState } from "react";
import "./NewColumn.scss";
import PropTypes from "prop-types";
import fetchData from "helper/fetchData";


const NewColumn = ({ appendNewColumn, boardId }) => {
	const [columnName, setColumnName] = useState("");

	const handleNewColumnChange = (event) => {
		const newColumnName = event.target.value;
		if (newColumnName.length < 20) {
			setColumnName(newColumnName);
		}
	};

	const createNewColumn = async (event) => {
		if (event.key === "Enter" && columnName.trim() !== "") {
			setColumnName("");
            const { data } = await fetchData({
				method: "POST",
				url: `/board/${boardId}/column`,
                token: true,
                payload: {
                    name: columnName
                }
			});
			if(!!data) appendNewColumn(data.newColumn);
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
	appendNewColumn: PropTypes.func.isRequired,
};

export default NewColumn;
