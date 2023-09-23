import React, { PropsWithChildren } from "react";

import { ColumnProps } from "./types";

import { Draggable } from "react-beautiful-dnd";

import useRBAC from "@/hooks/useRBAC";

const ColumnDraggable: React.FC<ColumnProps & PropsWithChildren<{ className?: string }>> = (
  props
) => {
  const { columnId, columnIndex, boardId } = props;
  const canMoveColumn = useRBAC({ boardId, action: "COLUMN_MOVE" });

  return (
    <Draggable draggableId={columnId} index={columnIndex} isDragDisabled={!canMoveColumn}>
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
