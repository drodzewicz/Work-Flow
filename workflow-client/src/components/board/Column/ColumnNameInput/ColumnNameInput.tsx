import React, { useState, useEffect, useRef, ChangeEvent } from "react";

import { FaCheck, FaTimes } from "react-icons/fa";

import "./ColumnNameInput.scss";

export interface ColumnNameInputProps {
  initialVal: string;
  onEnter: (newTitle: string) => void;
  hideInput: () => void;
  editTitle: boolean;
}

const ColumnNameInput: React.FC<any> = ({ value, onSubmit }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>(value);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);

  const cancelEditHandler = () => {
    setIsEditing(false);
    setColumnName(value);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setColumnName(e.target.value);
  };

  const saveChanges = () => {
    onSubmit(columnName);
    setIsEditing(false);
  };

  const updateColumnName = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && columnName.trim() !== "") {
      saveChanges();
    }
  };

  const activateEditingMode = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <input
        ref={ref}
        className="column-name column-name--input"
        onKeyDown={updateColumnName}
        onBlur={cancelEditHandler}
        onChange={onChangeHandler}
        value={columnName}
        type="text"
      />
    );
  }

  return (
    <span onDoubleClick={activateEditingMode} className="column-name column-name--text">
      {columnName}
    </span>
  );
};

export default ColumnNameInput;
