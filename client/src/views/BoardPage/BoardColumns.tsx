import React from "react";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import useBoardId from "@/hooks/useBoardId";
import useRBAC from "@/hooks/useRBAC";

import useMoveColumn from "@/service/column/useMoveColumn";
import { useGetTasks } from "@/service/task";
import useMoveTask from "@/service/task/useMoveTask";
import { emitWebSocket } from "@/service/utils/emitWebSocket";

import * as Skeleton from "@/components/layout/Skeleton";

import ColumnContainer from "@/components/board/Column/ColumnContainer";
import NewColumn from "@/components/board/NewColumn/NewColumn";

const BoardColumns: React.FC = () => {
  const boardId = useBoardId();
  const { mutate: moveColumn } = useMoveColumn({
    boardId,
    onSuccess: () => {
      emitWebSocket(boardId, { event: "column-update", type: "MOVE" });
    },
  });
  const { mutate: moveTask } = useMoveTask({
    boardId,
    onSuccess: () => {
      emitWebSocket(boardId, { event: "task-update", type: "MOVE" });
    },
  });

  const { hasAccess: canCreateColumn } = useRBAC({ boardId, action: "COLUMN_CREATE" });

  const { data = [], isLoading } = useGetTasks({ boardId });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, type, draggableId } = result;
    switch (type) {
      case "droppableTaskToColumn":
        moveTask({
          taskId: draggableId,
          source: { columnId: source.droppableId },
          destination: { columnId: destination.droppableId, rowIndex: destination.index },
        });
        break;
      case "droppableColumn": {
        const shouldMoveColumn = window.confirm(
          "Are you sure you want to update order of this column?",
        );
        if (shouldMoveColumn) {
          moveColumn({ columnId: draggableId, destination: destination.index });
        }
        break;
      }
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
          <ColumnContainer data={data} />
        </Skeleton.Container>
        {canCreateColumn && <NewColumn />}
      </div>
    </DragDropContext>
  );
};

export default BoardColumns;
