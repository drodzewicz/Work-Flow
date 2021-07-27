import React, {useContext} from "react";
import { ColumnProps } from "../";
import Column from "../Column";
import { Draggable } from "react-beautiful-dnd";
import { UserContext } from "context/UserContext"
import { UserBoardRoles  } from "types/general";

const DragableColumn: React.FC<ColumnProps> = (props) => {
  const { columnId, columnIndex } = props;
  const { userState } = useContext(UserContext);

  const isDraggable = () => {
    return (
      userState.currentBoard.role === UserBoardRoles.ADMIN ||
      userState.currentBoard.role === UserBoardRoles.OWNER
    );
  }

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
