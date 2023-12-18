import React from "react";

import Column from "@/components/board/Column/Column";

import DroppableColumnWrapper from "./DroppableColumnWrapper";

type ColumnContainerType = {
  data: ColumnWithTasks[];
};

const ColumnContainer: React.FC<ColumnContainerType> = ({ data }) => {
  return (
    <DroppableColumnWrapper className="task-board__task-row">
      {data.map(({ _id, name }, index) => (
        <Column key={_id} columnId={_id} columnName={name} columnIndex={index} />
      ))}
    </DroppableColumnWrapper>
  );
};

export default ColumnContainer;
