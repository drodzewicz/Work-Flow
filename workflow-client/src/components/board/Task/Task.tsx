import React from "react";

import { useNavigate } from "react-router-dom";

import useBoardId from "@/hooks/useBoardId";

import ItemContainer from "@/components/layout/ItemContainer";

import TaskAssignees from "@/components/board/Task/TaskAssignees";
import TaskDraggable from "@/components/board/Task/TaskDraggable";

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
  const navigate = useNavigate();
  const boardId = useBoardId();

  const openTaskModal = () => {
    navigate(`/board/${boardId}/task/${taskId}`);
  };

  return (
    <>
      <TaskDraggable className="task-card" taskId={taskId} taskIndex={indexes.taskIndex}>
        <div onClick={openTaskModal}>
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
    </>
  );
};

export default Task;
