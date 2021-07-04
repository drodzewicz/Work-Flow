import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./TaskDisplay.scss";
import User from "components/board/User";
import Tag from "components/board/Tag/Tag";
import Button from "components/general/Button/Button";

import { ModalContext, ModalActionType } from "context/ModalContext";
import { AlertContext, AlertActionType } from "context/AlertContext";
import { UserContext } from "context/UserContext";

import TaskUpdate from "components/modalForms/TaskEditor/TaskUpdate";
import { getBoardTask, deleteTask } from "service";
import LoadingOverlay from "components/layout/LoadingOverlay/LoadingOverlay";
import { TaskDisplayProps } from ".";

const TaskDisplay: React.FC<TaskDisplayProps> = ({ taskId }) => {
  const { modalDispatch } = useContext(ModalContext);
  const { alertDispatch } = useContext(AlertContext);
  const {
    userState: { currentBoard, user },
  } = useContext(UserContext);

  const history = useHistory();

  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    tags: [],
    taskAuthor: {
      avatarImageURL: "",
      _id: "loading",
      username: "loading",
    },
    peopleAssigned: [],
  });
  const [isTaskLoading, setTaskLoading] = useState(true);

  useEffect(() => {
    let _isMounted = true;
    const getTaskInfo = async () => {
      const { data, status } = await getBoardTask({ boardId: currentBoard?.id || "", taskId });
      if (_isMounted) setTaskLoading(false);
      if (status === 400) {
        alertDispatch({ type: AlertActionType.WARNING, payload: { message: "Task not found" } });
        modalDispatch({ type: ModalActionType.CLOSE });
      } else if (!!data && _isMounted) {
        history.push({
          search: `?task=${taskId}`,
        });
        const { title, description, tags, author, people } = data.task;
        setTaskDetails({
          title,
          description,
          tags,
          taskAuthor: author,
          peopleAssigned: people,
        });
      }
    };
    getTaskInfo();
    return () => {
      history.push({
        search: "",
      });
      _isMounted = false;
    };
  }, [currentBoard.id, taskId, history, modalDispatch, alertDispatch]);

  const deleteTaskk = async () => {
    const shouldDelete = window.confirm("are you sure you want to delete this task?");
    if (shouldDelete) {
      deleteTask({
        boardId: currentBoard?.id || "",
        payload: {
          taskId,
        },
        res: (res) => {
          if (res.success) modalDispatch({ type: ModalActionType.CLOSE });
        },
      });
    }
  };

  const openTaskEditModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: {
        title: "Edit Task",
        render: <TaskUpdate taskId={taskId} boardId={currentBoard?.id || ""} />,
      },
    });
  };

  const isAuthorizedToEdit = () => {
    const { role } = currentBoard;
     return taskDetails.taskAuthor._id === user._id || role === "OWNER" || role === "ADMIN";
  };

  return (
    <div className="display-task-wrapper">
      <LoadingOverlay show={isTaskLoading} opacity={0}>
        <div className="display-task">
          <div className="text-details">
            {isAuthorizedToEdit() && (
              <div className="info-header">
                <Button className="edit-btn delete-btn" onClick={deleteTaskk}>
                  delete
                </Button>
                <Button className="edit-btn" onClick={openTaskEditModal}>
                  edit
                </Button>
              </div>
            )}

            <h1 className="task-title">{taskDetails.title}</h1>
            <p className="task-description">{taskDetails.description}</p>
            <div className="tag-container">
              {taskDetails.tags.map(({ _id, color, name }) => (
                <Tag key={_id} colorCode={color} tagName={name} />
              ))}
            </div>
          </div>
          <div className="people-details">
            <h2 className="added-by user-title">Task Author</h2>
            <User
              username={taskDetails.taskAuthor.username}
              imageSrc={taskDetails.taskAuthor.avatarImageURL}
            />
            <h2 className="assigned-people-title user-title">People</h2>
            <div className="assigned-people-container">
              {taskDetails.peopleAssigned.map(({ _id, username, avatarImageURL }) => (
                <User key={_id} username={username} imageSrc={avatarImageURL} />
              ))}
            </div>
          </div>
        </div>
      </LoadingOverlay>
    </div>
  );
};

export default TaskDisplay;
