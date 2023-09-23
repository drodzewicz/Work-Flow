import React from "react";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import useBoardTask from "@/hooks/useBoardTasks";
import useRBAC from "@/hooks/useRBAC";

import { useGetTasks } from "@/service/task";

import * as Skeleton from "@/components/layout/Skeleton";

import ColumnContainer from "@/components/board/Column/ColumnContainer";
import NewColumn from "@/components/board/NewColumn/NewColumn";

type BoardColumnsProps = {
  boardId: string;
};

const BoardColumns: React.FC<BoardColumnsProps> = ({ boardId }) => {
  const { setData, setBoard, moveColumn, moveTask } = useBoardTask();

  const canCreateColumn = useRBAC({ boardId, action: "COLUMN_CREATE" });

  const { isLoading } = useGetTasks({
    boardId,
    onSuccess: (data) => {
      setData(data as ColumnWithTasks[]);
      setBoard(boardId);
    },
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, type, draggableId } = result;
    switch (type) {
      case "droppableTaskToColumn":
        moveTask(
          draggableId,
          { columnId: source.droppableId },
          { columnId: destination.droppableId, rowIndex: destination.index }
        );
        break;
      case "droppableColumn":
        moveColumn(draggableId, source.index, destination.index);
        break;
      default:
        break;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-board scrollbar">
        <Skeleton.Container
          show={isLoading}
          containerClassName="task-board__task-row"
          count={4}
          element={
            <Skeleton.Column>
              <Skeleton.Container count={3} show element={<Skeleton.Task />} />
            </Skeleton.Column>
          }
        >
          <ColumnContainer boardId={boardId} />
        </Skeleton.Container>
        {canCreateColumn && <NewColumn boardId={boardId} />}
      </div>
    </DragDropContext>
  );
};

export default BoardColumns;
