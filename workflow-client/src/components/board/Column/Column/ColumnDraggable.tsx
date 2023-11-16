import React, { PropsWithChildren } from "react";

import { Draggable } from "react-beautiful-dnd";

import useBoardId from "@/hooks/useBoardId";
import useRBAC from "@/hooks/useRBAC";

import { ColumnProps } from "./Column";

const ColumnDraggable: React.FC<ColumnProps & PropsWithChildren<{ className?: string }>> = (
  props
) => {
  const boardId = useBoardId();
  const { columnId, columnIndex } = props;
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
