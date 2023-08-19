import React from "react";

import useModal from "@/hooks/useModal";

import Modal from "@/components/layout/Modal";

import TaskDisplay from "@/dialogs/TaskDisplay/TaskDisplay";

import "./Task.scss";

import TaskDraggable from "./TaskDraggable";

export interface TaskProps {
  taskId: string;
  title: string;
  indexes: {
    taskIndex: number;
    columnIndex: number;
  };
  tags?: unknown[];
  people?: User[];
}

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
