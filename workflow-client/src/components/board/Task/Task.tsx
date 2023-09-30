import React from "react";

import useModal from "@/hooks/useModal";

import Image from "@/components/general/Image/Image";

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
            <div>
              {tags.map((tag) => (
                <span key={tag._id} style={{ background: tag.key }}>
                  {tag.name}
                </span>
              ))}
            </div>
            <div>
              {assignees.map((assignee) => (
                <Image
                  className="task-card__avatar"
                  key={assignee.username}
                  src={assignee.avatarImageURL}
                  title={assignee.username}
                />
              ))}
            </div>
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
