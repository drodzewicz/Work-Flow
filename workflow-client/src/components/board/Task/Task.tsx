import React, { useContext, useRef } from "react";

import { UserBoardRoles } from "@/types/general";

import { TaskProps } from "./types";

import { Draggable } from "react-beautiful-dnd";

import Image from "@/components/general/Image";
import Tooltip from "@/components/general/Tooltip";

import TagMini from "@/components/board/Tag/TagMini";

import TaskDisplay from "@/dialogs/TaskDisplay/TaskDisplay";

import "./Task.scss";

const Task: React.FC<TaskProps> = ({ taskId, title, indexes, tags = [], people = [] }) => {
  const currentBoard = "board";

  const poepleAnchorElement = useRef(null);
  const tagsAnchorElement = useRef(null);

  const { taskIndex } = indexes;

  const openTaskDetailsModal = () => {
    // modalDispatch({
    //   type: ModalActionType.OPEN,
    //   payload: {
    //     render: <TaskDisplay taskId={taskId} />,
    //     title: "Task Details",
    //     size: "l",
    //   },
    // });
  };

  return (
    <Draggable draggableId={taskId} index={taskIndex}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card ${snapshot.isDragging ? "task-card--dragging" : ""}`}
          onClick={openTaskDetailsModal}
          style={{ ...provided.draggableProps.style }}
        >
          <h3 className="task-card__title">{title}</h3>
          <div className="task-card__bottom"></div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
