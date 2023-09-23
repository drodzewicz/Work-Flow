import React, { ChangeEvent, useState } from "react";

import { useCreateColumn } from "@/service/column";

import "./NewColumn.scss";

export interface NewColumnProps {
  boardId: string;
}

const NewColumn: React.FC<NewColumnProps> = ({ boardId }) => {
  const [columnName, setColumnName] = useState<string>("");

  const { mutate: createNewColumn } = useCreateColumn({ boardId });

  const handleNewColumnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColumnName = event.target.value;
    if (newColumnName.length < 20) {
      setColumnName(newColumnName);
    }
  };

  const createNewColumnHandler = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && columnName.trim() !== "") {
      createNewColumn(columnName);
      setColumnName("");
    }
  };
  return (
    <div>
      <div className="add-new-column">
        <input
          onKeyDown={createNewColumnHandler}
          value={columnName}
          onChange={handleNewColumnChange}
          type="text"
          placeholder="+ new column"
        />
      </div>
    </div>
  );
};

export default NewColumn;
