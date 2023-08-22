import React, { PropsWithChildren } from "react";

import { ColumnProps } from "./types";

import { Draggable } from "react-beautiful-dnd";

const ColumnDraggable: React.FC<ColumnProps & PropsWithChildren<{ className?: string }>> = (
  props
) => {
  const { columnId, columnIndex } = props;

  return (
    <Draggable draggableId={columnId} index={columnIndex} isDragDisabled={false}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={props.className}
        >
          {props.children}
        </div>
      )}
    </Draggable>
  );
};

export default ColumnDraggable;
