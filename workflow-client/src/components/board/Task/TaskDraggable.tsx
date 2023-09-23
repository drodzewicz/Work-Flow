import React, { PropsWithChildren } from "react";

import { Draggable } from "react-beautiful-dnd";

import useBoardTask from "@/hooks/useBoardTasks";
import useRBAC from "@/hooks/useRBAC";

import "./Task.scss";

const TaskDraggable: React.FC<
  PropsWithChildren<{
    taskId: string;
    taskIndex: number;
    className?: string;
  }>
> = ({ taskId, taskIndex, children, className }) => {
  const { data } = useBoardTask();
  const canMoveTask = useRBAC({ boardId: data.boardId, action: "TASK_MOVE" });

  return (
    <Draggable draggableId={taskId} index={taskIndex} isDragDisabled={!canMoveTask}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${snapshot.isDragging ? "task-card--dragging" : ""} ${className}`}
          style={{ ...provided.draggableProps.style }}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

export default TaskDraggable;
