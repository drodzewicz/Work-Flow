import React from "react";

import useModal from "@/hooks/useModal";

import ItemContainer from "@/components/layout/ItemContainer";
import Modal from "@/components/layout/Modal";

import TaskAssignees from "@/components/board/Task/TaskAssignees";
import TaskDraggable from "@/components/board/Task/TaskDraggable";

import TaskDisplay from "@/dialogs/TaskDisplay";

import "./Task.scss";

import TagCard from "../TagCard/TagCard";

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
            <ItemContainer<Tag>
              itemKey="_id"
              items={tags}
              className="task-card__tags"
              noContentMessage=""
              render={({ key, name }) => <TagCard name={name} color={key} />}
            />
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
