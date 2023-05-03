import React, { ChangeEvent, useState } from "react";

import { NewColumnProps } from "./types";

import { createColumn } from "@/service";

import "./NewColumn-dark.scss";
import "./NewColumn.scss";

const NewColumn: React.FC<NewColumnProps> = ({ boardId }) => {
  const [columnName, setColumnName] = useState<string>("");

  const handleNewColumnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColumnName = event.target.value;
    if (newColumnName.length < 20) {
      setColumnName(newColumnName);
    }
  };

  const createNewColumn = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && columnName.trim() !== "") {
      createColumn({
        boardId,
        payload: { name: columnName },
        res: (response: any) => {
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

export default NewColumn;
