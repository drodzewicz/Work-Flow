import React, { useContext, useRef } from "react";
import "./Task.scss";
import Image from "components/general/Image";
import { TaskDisplay } from "components/modalForms";
import { ModalContext, ModalActionType } from "context/ModalContext";
import { TaskContext } from "context/TaskContext";
import { UserContext } from "context/UserContext";
import Tooltip from "components/general/Tooltip";

import { Draggable } from "react-beautiful-dnd";
import { TaskProps } from "./";
import TagMini from "components/board/Tag/TagMini";

const Task: React.FC<TaskProps> = ({ taskId, title, indexes, tags = [], people = [] }) => {
  const { modalDispatch } = useContext(ModalContext);
  const [, setTasks] = useContext(TaskContext);
  const {
    userState: { currentBoard },
  } = useContext(UserContext);

  const poepleAnchorElement = useRef(null);
  const tagsAnchorElement = useRef(null);

  const { taskIndex, columnIndex } = indexes;

  const updateTask = (updatedTask: any) => {
    setTasks((tasks: any) => {
      const tempTasks = [...tasks];
      tempTasks[columnIndex].tasks[taskIndex] = updatedTask;
      return tempTasks;
    });
    modalDispatch({ type: ModalActionType.CLOSE });
  };

  const openTaskDetailsModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: {
        render: <TaskDisplay taskId={taskId} updateTask={updateTask} />,
        title: "Task Details",
      },
    });
  };

  const AssignedUsers: React.FC = () => {
    const maxUserAmount = 3;
    const userAmount = people.length;
    const displayUsers = people.slice(0, maxUserAmount);

    return (
      <div ref={poepleAnchorElement} className="task-card__bottom__users">
        {displayUsers.map(({ _id, avatarImageURL }: { _id: string; avatarImageURL: string }) => (
          <Image key={_id} className="task-card__avatar" src={avatarImageURL} />
        ))}
        {maxUserAmount - userAmount < 0 && (
          <span className="task-card__bottom__more-users">{`+${Math.abs(
            maxUserAmount - userAmount
          )}`}</span>
        )}
      </div>
    );
  };

  const TaskTags: React.FC = () => {
    return (
      <div className="task-card__bottom__tags" ref={tagsAnchorElement}>
        {tags.map(({ colorCode, _id }) => (
          <TagMini colorCode={colorCode} key={_id} />
        ))}
      </div>
    );
  };

  return (
    <Draggable
      draggableId={taskId}
      index={taskIndex}
      isDragDisabled={currentBoard.role === "guest"}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card ${snapshot.isDragging ? "task-card--dragging" : ""}`}
          onClick={openTaskDetailsModal}
          style={{ ...provided.draggableProps.style }}>
          <h3 className="task-card__title">{title}</h3>
          <div className="task-card__bottom">
            <TaskTags />
            <Tooltip anchorEl={tagsAnchorElement}>
              {tags.map(({ _id, name }) => (
                <span key={_id}>{name}</span>
              ))}
            </Tooltip>
            <AssignedUsers />
            <Tooltip anchorEl={poepleAnchorElement}>
              {people.map(({ _id, username }) => (
                <span key={_id}>{username}</span>
              ))}
            </Tooltip>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
