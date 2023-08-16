import React, { useContext, useRef } from "react";

import { UserBoardRoles } from "@/types/general";

import { TaskProps } from "./types";

import { Draggable } from "react-beautiful-dnd";

import useModal from "@/hooks/useModal";

import Image from "@/components/general/Image";
import Tooltip from "@/components/general/Tooltip";

import Modal from "@/components/layout/Modal";

import TagMini from "@/components/board/Tag/TagMini";

import TaskDisplay from "@/dialogs/TaskDisplay/TaskDisplay";

import "./Task.scss";

import TaskDraggable from "./TaskDraggable";

const Task: React.FC<TaskProps> = ({ taskId, title, indexes, tags = [], people = [] }) => {
  const {
    show: showTaskViewDialog,
    open: openTaskViewDialog,
    close: closeTaskViewDialog,
  } = useModal();

  return (
    <>
      <TaskDraggable className="task-card" taskId={taskId} taskIndex={indexes.taskIndex}>
        <div onClick={openTaskViewDialog}>
          <h3 className="task-card__title">{title}</h3>
          <div className="task-card__bottom"></div>
        </div>
      </TaskDraggable>
      <Modal show={showTaskViewDialog} title="" size="l" onClose={closeTaskViewDialog}>
        <TaskDisplay taskId={taskId} />
      </Modal>
    </>
  );
};

export default Task;
