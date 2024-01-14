import React, { useState, useEffect, useRef, ChangeEvent } from "react";

import "./ColumnNameInput.scss";

export interface ColumnNameInputProps {
  value: string;
  disabled?: boolean;
  onSubmit: (value: string) => void;
}

const ColumnNameInput: React.FC<ColumnNameInputProps> = ({ value, disabled, onSubmit }) => {
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
    if (!disabled) {
      setIsEditing(true);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={ref}
        aria-label="column-title"
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
    <span
      aria-label="column-title"
      onDoubleClick={activateEditingMode}
      className="column-name column-name--text"
    >
      {columnName}
    </span>
  );
};

export default ColumnNameInput;
