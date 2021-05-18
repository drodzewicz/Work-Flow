import React, { useState } from "react";
import "./NewColumn.scss";
import PropTypes from "prop-types";

import { createColumn } from "service";

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
      createColumn({
        boardId,
        payload: { name: columnName },
        res: (response) => {
          if (!response.error) setColumnName("");
        },
      });
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
