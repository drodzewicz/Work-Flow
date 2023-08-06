import React from "react";

import { ColumnProps } from "../types";

import { Draggable } from "react-beautiful-dnd";

import Column from "../Column";

const DragableColumn: React.FC<ColumnProps> = (props) => {
  const { columnId, columnIndex } = props;

  const isDraggable = () => {
    // return (
    //   userState.currentBoard.role === UserBoardRoles.ADMIN ||
    //   userState.currentBoard.role === UserBoardRoles.OWNER
    // );
    return true;
  };

  return (
    <Draggable draggableId={columnId} index={columnIndex} isDragDisabled={!isDraggable()}>
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
