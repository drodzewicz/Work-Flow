import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import "./TaskDisplay.scss";
import User from "components/board/User";
import Tag from "components/board/Tag/Tag";
import Button from "components/general/Button/Button";

import { ModalContext, ModalActionType } from "context/ModalContext";
import { AlertContext, AlertActionType } from "context/AlertContext";
import { UserContext } from "context/UserContext";

import TaskEditor from "components/modalForms/TaskEditor/TaskEditor";
import { getBoardTask, deleteTask } from "service";
import LoadingOverlay from "components/layout/LoadingOverlay/LoadingOverlay";

const TaskDisplay = ({ taskId, updateTask }) => {
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
      _id: "loading",
      username: "loading",
    },
    peopleAssigned: [],
  });
  const [isTaskLoading, setTaskLoading] = useState(true);

  useEffect(() => {
    let _isMounted = true;
    const getTaskInfo = async () => {
      const { data, status } = await getBoardTask({ boardId: currentBoard.id, taskId });
      if (_isMounted) setTaskLoading(false);
      if (status === 400) {
        alertDispatch({ type: AlertActionType.WARNING, payload: { message: "Task not found" } });
        modalDispatch({ type: ModalActionType.CLOSE });
      } else if (!!data && _isMounted) {
        history.push({
          search: `?task=${taskId}`,
        });
        setTaskDetails({
          title: data.task.title,
          description: data.task.description,
          tags: data.task.tags,
          taskAuthor: data.task.author,
          peopleAssigned: data.task.people,
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
        boardId: currentBoard.id,
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
        render: (
          <TaskEditor
            buttonName="Update"
            updateTask={updateTask}
            boardId={currentBoard.id}
            taskId={taskId}
            action={"UPDATE"}
            initialValues={{
              name: taskDetails.title,
              description: taskDetails.description,
              tags: taskDetails.tags,
              people: taskDetails.peopleAssigned,
            }}
          />
        ),
      },
    });
  };

  const isAuthorizedToEdit = () => {
    const { role } = currentBoard;
    if (role === "guest") {
      return false;
    } else {
      return taskDetails.taskAuthor._id === user._id || role === "owner" || role === "admin";
    }
  };

  return (
    <div className="display-task-wrapper">
      <LoadingOverlay show={isTaskLoading} opacity={0}>
        <div className="display-task">
          <div className="text-details">
            {isAuthorizedToEdit() && (
              <div className="info-header">
                <Button classes="edit-btn delete-btn" onClick={deleteTaskk}>
                  delete
                </Button>
                <Button classes="edit-btn" onClick={openTaskEditModal}>
                  edit
                </Button>
              </div>
            )}

            <h1 className="task-title">{taskDetails.title}</h1>
            <p className="task-description">{taskDetails.description}</p>
            <div className="tag-container">
              {taskDetails.tags.map(({ _id, colorCode, name }) => (
                <Tag key={_id} colorCode={colorCode} tagName={name} />
              ))}
            </div>
          </div>
          <div className="people-details">
            <h2 className="added-by user-title">Task Author</h2>
            <User
              username={taskDetails.taskAuthor.username}
              imageURL={taskDetails.taskAuthor.avatarImageURL}
            />
            <h2 className="assigned-people-title user-title">People</h2>
            <div className="assigned-people-container">
              {taskDetails.peopleAssigned.map(({ _id, username, avatarImageURL }) => (
                <User key={_id} username={username} imageURL={avatarImageURL} />
              ))}
            </div>
          </div>
        </div>
      </LoadingOverlay>
    </div>
  );
};

TaskDisplay.propTypes = {
  taskId: PropTypes.string.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskDisplay;
