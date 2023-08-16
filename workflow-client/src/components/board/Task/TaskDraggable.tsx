import React from "react";

import { Draggable } from "react-beautiful-dnd";

import "./Task.scss";

const TaskDraggable: React.FC<{
  taskId: string;
  taskIndex: number;
  children?: React.ReactNode;
  className?: string;
}> = ({ taskId, taskIndex, children, className }) => {
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
