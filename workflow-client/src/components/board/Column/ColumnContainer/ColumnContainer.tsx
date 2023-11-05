import React from "react";

import Column from "@/components/board/Column/Column";

import ColumnDroppableContainer from "./ColumnDroppableContainer";

const ColumnContainer: React.FC<{ data: ColumnWithTasks[] }> = ({ data }) => {
  return (
    <ColumnDroppableContainer className="task-board__task-row">
      {data.map(({ _id, name }, index) => (
        <Column key={_id} columnId={_id} columnName={name} columnIndex={index} />
      ))}
    </ColumnDroppableContainer>
  );
};

export default ColumnContainer;
