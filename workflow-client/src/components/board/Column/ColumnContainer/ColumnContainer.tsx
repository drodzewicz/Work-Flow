import React from "react";

import useBoardId from "@/hooks/useBoardId";

import { useGetTasks } from "@/service/task";

import Column from "@/components/board/Column/Column";

import ColumnDroppableContainer from "./ColumnDroppableContainer";

const ColumnContainer: React.FC = () => {
  const boardId = useBoardId();
  const { data = [] } = useGetTasks({ boardId });

  return (
    <ColumnDroppableContainer className="task-board__task-row">
      {(data as ColumnWithTasks[]).map(({ _id, name }, index) => (
        <Column key={_id} columnId={_id} columnName={name} columnIndex={index} />
      ))}
    </ColumnDroppableContainer>
  );
};

export default ColumnContainer;
