import React from "react";

import { Droppable } from "react-beautiful-dnd";

import Column from "../Column";

const ColumnDroppableContainer: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <Droppable droppableId="droppable" type="droppableColumn" direction="horizontal">
      {(provided) => {
        return (
          <div className={className} ref={provided.innerRef}>
            {children}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default ColumnDroppableContainer;
