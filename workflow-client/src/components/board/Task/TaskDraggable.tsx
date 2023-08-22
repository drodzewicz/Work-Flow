import React, { PropsWithChildren } from "react";

import { Draggable } from "react-beautiful-dnd";

import "./Task.scss";

const TaskDraggable: React.FC<
  PropsWithChildren<{
    taskId: string;
    taskIndex: number;
    className?: string;
  }>
> = ({ taskId, taskIndex, children, className }) => {
  return (
    <Draggable draggableId={taskId} index={taskIndex}>
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
