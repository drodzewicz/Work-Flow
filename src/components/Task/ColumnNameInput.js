import React, { useState, useEffect, useRef } from "react";

const ColumnNameInput = ({ initialVal, onEnter, hideInput }) => {
	const columnNameInputRef = useRef();

	const [columnNameState, setColumnName] = useState(initialVal);

	useEffect(() => {
		columnNameInputRef.current.focus();
		return () => {};
	}, []);

	const cancelEditHandler = () => {
		setColumnName(initialVal);
		hideInput();
	};

	const columnNameOnChangeHandler = (e) => {
		setColumnName(e.target.value);
	};

	const updateColumnName = (e) => {
		if (e.key === "Enter" && columnNameState !== "") {
			onEnter(columnNameState);
		}
	};

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
};

export default ColumnNameInput;
