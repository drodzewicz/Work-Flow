import React, { PropsWithChildren } from "react";

import { Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";

import useRBAC from "@/hooks/useRBAC";

import "./Task.scss";

const TaskDraggable: React.FC<
  PropsWithChildren<{
    taskId: string;
    taskIndex: number;
    className?: string;
  }>
> = ({ taskId, taskIndex, children, className }) => {
  const { id: boardId = "" } = useParams<{ id: string }>();
  const canMoveTask = useRBAC({ boardId, action: "TASK_MOVE" });

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
