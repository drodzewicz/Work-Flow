import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./TaskDisplay.scss";
import User from "components/board/User";
import Tag from "components/board/Tag/Tag";
import Button from "components/general/Button";

import { ModalContext, ModalActionType } from "context/ModalContext";
import { AlertContext, AlertActionType } from "context/AlertContext";
import { UserContext } from "context/UserContext";

import TaskUpdate from "dialogs/TaskEditor/TaskUpdate";
import { getBoardTask, deleteTask } from "service";
import LoadingOverlay from "components/layout/LoadingOverlay";
import { TaskDisplayProps } from ".";
import { TaskI } from "types/general";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios, { CancelTokenSource } from "axios";

const TaskDisplay: React.FC<TaskDisplayProps> = ({ taskId }) => {
  const { modalDispatch } = useContext(ModalContext);
  const { alertDispatch } = useContext(AlertContext);
  const {
    userState: { currentBoard, user },
  } = useContext(UserContext);

  const history = useHistory();
  const source = useRef<CancelTokenSource | null>(null);

  const [taskDetails, setTaskDetails] = useState<TaskI>({
    _id: "",
    title: "",
    description: "",
    author: {
      _id: "",
      username: "",
      avatarImageURL: "",
    },
    people: [],
    tags: [],
  });
  const [isTaskLoading, setTaskLoading] = useState(true);

  useEffect(() => {
    source.current = axios.CancelToken.source();
    return () => {
      source.current?.cancel();
    };
  }, []);

  useEffect(() => {
    const getTaskInfo = async () => {
      const { data, status } = await getBoardTask({
        boardId: currentBoard?.id || "",
        taskId,
        setLoading: setTaskLoading,
        cancelToken: source.current?.token,
      });
      if (status === 400) {
        alertDispatch({ type: AlertActionType.WARNING, payload: { message: "Task not found" } });
        modalDispatch({ type: ModalActionType.CLOSE });
      } else if (!!data) {
        history.push({
          search: `?task=${taskId}`,
        });
        const { task } = data;
        setTaskDetails(task);
      }
    };
    getTaskInfo();
    return () => {
      history.push({
        search: "",
      });
    };
  }, [currentBoard, taskId, history, modalDispatch, alertDispatch]);

  const deleteTaskHandler = async () => {
    const shouldDelete = window.confirm("are you sure you want to delete this task?");
    if (shouldDelete) {
      deleteTask({
        boardId: currentBoard?.id || "",
        payload: {
          taskId,
        },
        res: (res) => {
          const { error } = res;
          if (!error) modalDispatch({ type: ModalActionType.CLOSE });
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
    return taskDetails.author._id === user._id || role === "OWNER" || role === "ADMIN";
  };

  return (
    <LoadingOverlay className="task-display-loader" show={isTaskLoading} opacity={0}>
      <section className="task-display">
        <header className="task-display__header">
          {isAuthorizedToEdit() && (
            <div className="task-display__header__controls">
              <Button className="task-display__header__controls__btn" onClick={deleteTaskHandler}>
                <FaTrashAlt /> Delete
              </Button>
              <Button className="task-display__header__controls__btn" onClick={openTaskEditModal}>
                <FaEdit /> Edit
              </Button>
            </div>
          )}
          <h1 className="task-display__header__title">{taskDetails.title}</h1>
        </header>
        <hr className="break-line" />
        <article className="task-display__body">
          <div className="task-display__body__content">
            <div className="task-display__body__content__tags">
              {taskDetails.tags.map(({ _id, color, name }) => (
                <Tag key={_id} colorCode={color} tagName={name} />
              ))}
            </div>
            <p className="task-display__body__content__description">{taskDetails.description}</p>
          </div>
          <aside className="task-display__body__people">
            <div className="task-display__body__people__author">
              <label className="task-display__body__people__label">Task Author</label>
              <User
                username={taskDetails.author.username}
                imageSrc={taskDetails.author.avatarImageURL}
              />
            </div>
            <label className="task-display__body__people__label">Asignees</label>
            <div className="task-display__body__people__asignees scrollbar">
              {taskDetails.people.length === 0 && (
                <i className="task-display__body__people__message">No user has been assinged</i>
              )}
              {taskDetails.people.map(({ _id, username, avatarImageURL }) => (
                <User key={_id} username={username} imageSrc={avatarImageURL} />
              ))}
            </div>
          </aside>
        </article>
      </section>
    </LoadingOverlay>
  );
};

export default TaskDisplay;
