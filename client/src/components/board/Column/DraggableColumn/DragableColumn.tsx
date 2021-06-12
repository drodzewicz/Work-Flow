import React from "react";
import { ColumnProps } from "../";
import Column from "../Column";
import { Draggable } from "react-beautiful-dnd";

const DragableColumn: React.FC<ColumnProps> = (props) => {
  const { columnId, columnIndex } = props;
  return (
    <Draggable
      draggableId={columnId}
      index={columnIndex}
      //   isDragDisabled={currentBoard.role === "guest"}
      isDragDisabled={false}>
      {(provided) => {
        return (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <Column key={columnId} {...props} />
          </div>
        );
      }}
    </Draggable>
  );
};

export default DragableColumn;
