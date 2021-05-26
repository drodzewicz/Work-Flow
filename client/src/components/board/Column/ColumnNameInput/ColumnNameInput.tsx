import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { ColumnNameInputProps } from ".";
import "./ColumnNameInput.scss";

const ColumnNameInput: React.FC<ColumnNameInputProps> = ({
  initialVal,
  onEnter,
  hideInput,
  editTitle,
}) => {
  const columnNameInputRef = useRef<HTMLInputElement>(null);

  const [columnNameState, setColumnName] = useState<string>(initialVal);

  useEffect(() => {
    columnNameInputRef.current?.focus();
    return () => {};
  }, [editTitle]);

  const cancelEditHandler = () => {
    setColumnName(initialVal);
    hideInput();
  };

  const columnNameOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedColumnName = e.target.value;
    if (updatedColumnName.length > 0) {
      setColumnName(updatedColumnName);
    }
  };

  const updateColumnName = (e: React.KeyboardEvent) => {
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
  return <h2 className="task-column-name">{initialVal}</h2>;
};

export default ColumnNameInput;
