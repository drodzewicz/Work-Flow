import React from "react";

import useModal from "@/hooks/useModal";

import Modal from "@/components/layout/Modal";

import TaskAssignees from "@/components/board/Task/TaskAssignees";
import TaskDraggable from "@/components/board/Task/TaskDraggable";
import TaskTags from "@/components/board/Task/TaskTags";

import TaskDisplay from "@/dialogs/TaskDisplay/TaskDisplay";

import "./Task.scss";

export interface TaskProps {
  taskId: string;
  title: string;
  indexes: {
    taskIndex: number;
    columnIndex: number;
  };
  tags?: Tag[];
  assignees?: User[];
}

const Task: React.FC<TaskProps> = ({ taskId, title, indexes, tags = [], assignees = [] }) => {
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
          <div className="task-card__bottom">
            <TaskTags tags={tags} />
            <TaskAssignees assignees={assignees} />
          </div>
        </div>
      </TaskDraggable>
      <Modal show={showTaskViewDialog} title="" size="l" onClose={closeTaskViewDialog}>
        <TaskDisplay taskId={taskId} closeModal={closeTaskViewDialog} />
      </Modal>
    </>
  );
};

export default Task;
