import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const ColumnNameInput = ({ initialVal, onEnter, hideInput, editTitle }) => {
	const columnNameInputRef = useRef();

	const [columnNameState, setColumnName] = useState(initialVal);

	useEffect(() => {
		if(!!columnNameInputRef.current) columnNameInputRef.current.focus();
		return () => {};
	}, [editTitle]);

	const cancelEditHandler = () => {
		setColumnName(initialVal);
		hideInput();
	};

	const columnNameOnChangeHandler = (e) => {
		const updatedColumnName = e.target.value;
		if (updatedColumnName.length > 0) {
			setColumnName(updatedColumnName);
		}
	};

	const updateColumnName = (e) => {
		if (e.key === "Enter" && columnNameState.trim() !== "") {
			onEnter(columnNameState);
		}
	};
	if (editTitle)
		return (
			<input
				ref={columnNameInputRef}
				className="column-name-input"
				onKeyDown={updateColumnName}
				onBlur={cancelEditHandler}
				onChange={columnNameOnChangeHandler}
				value={columnNameState}
				type="text"
			/>
		);
	else return <h2 className="task-column-name">{initialVal}</h2>;
};

ColumnNameInput.propTypes = {
	initialVal: PropTypes.string.isRequired,
	onEnter: PropTypes.func.isRequired,
	hideInput: PropTypes.func.isRequired,
	editTitle: PropTypes.bool.isRequired,
};

export default ColumnNameInput;
