import React from "react";

import useBoardTask from "@/hooks/useBoardTasks";

import Column from "@/components/board/Column/Column";

import ColumnDroppableContainer from "./ColumnDroppableContainer";

type BoardColumnsProps = {
  boardId: string;
};

const ColumnContainer: React.FC<BoardColumnsProps> = ({ boardId }) => {
  const { data } = useBoardTask();

  return (
    <ColumnDroppableContainer className="task-board__task-row">
      {data.columns.map(({ _id, name }, index) => (
        <Column key={_id} boardId={boardId} columnId={_id} columnName={name} columnIndex={index} />
      ))}
    </ColumnDroppableContainer>
  );
};

export default ColumnContainer;
