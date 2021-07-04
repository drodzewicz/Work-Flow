import React, {useContext} from "react";
import { ColumnProps } from "../";
import Column from "../Column";
import { Draggable } from "react-beautiful-dnd";
import { UserContext } from "context/UserContext"
import { UserBoardRoles  } from "types";

const DragableColumn: React.FC<ColumnProps> = (props) => {
  const { columnId, columnIndex } = props;
  const { userState } = useContext(UserContext);
  return (
    <Draggable
      draggableId={columnId}
      index={columnIndex}
      isDragDisabled={userState.currentBoard.role === UserBoardRoles.GUEST}>
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
