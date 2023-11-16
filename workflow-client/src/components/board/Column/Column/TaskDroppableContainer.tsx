import React, { PropsWithChildren } from "react";

import { Droppable } from "react-beautiful-dnd";

const TaskDroppableContainer: React.FC<
  PropsWithChildren<{
    columnId: string;
    className?: string;
  }>
> = (props) => {
  const { columnId } = props;

  return (
    <Droppable droppableId={columnId} type="droppableTaskToColumn">
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`${snapshot.isDraggingOver ? "task-column--active" : ""} ${
              props.className ?? ""
            }`}
          >
            {props.children}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};
export default TaskDroppableContainer;
