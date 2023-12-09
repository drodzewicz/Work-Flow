import React from "react";

import { Droppable } from "react-beautiful-dnd";

type DroppableTaskWrapperProps = React.PropsWithChildren<{
  columnId: string;
  className?: string;
}>;

const DroppableTaskWrapper: React.FC<DroppableTaskWrapperProps> = ({
  columnId,
  children,
  className = "",
}) => {
  return (
    <Droppable droppableId={columnId} type="droppableTaskToColumn">
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`${snapshot.isDraggingOver ? "task-column--active" : ""} ${className}`}
          >
            {children}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};
export default DroppableTaskWrapper;
