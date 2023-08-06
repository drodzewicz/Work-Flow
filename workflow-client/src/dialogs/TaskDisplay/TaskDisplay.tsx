import React, { useState, useContext, useEffect, useRef } from "react";

import { TaskI } from "@/types/general";

import { TaskDisplayProps } from "./types";

import { getBoardTask, deleteTask } from "@/service";
import axios, { CancelTokenSource } from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

// import { useHistory } from "react-router-dom";
import Button from "@/components/general/Button";

import LoadingOverlay from "@/components/layout/LoadingOverlay";

import Tag from "@/components/board/Tag/Tag";
import User from "@/components/board/User";

import TaskUpdate from "@/dialogs/TaskEditor/TaskUpdate";

import "./TaskDisplay.scss";

const TaskDisplay: React.FC<TaskDisplayProps> = ({ taskId }) => {
  // const history = useHistory();
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
        boardId: "",
        taskId,
        setLoading: setTaskLoading,
        cancelToken: source.current?.token,
      });
      if (status === 400) {
        // alertDispatch({ type: AlertActionType.WARNING, payload: { message: "Task not found" } });
        // modalDispatch({ type: ModalActionType.CLOSE });
      } else if (data) {
        // history.push({
        //   search: `?task=${taskId}`,
        // });
        const { task } = data;
        setTaskDetails(task);
      }
    };
    getTaskInfo();
    return () => {
      // history.push({
      //   search: "",
      // });
    };
  }, [taskId, history]);

  const deleteTaskHandler = async () => {
    const shouldDelete = window.confirm("are you sure you want to delete this task?");
    if (shouldDelete) {
      deleteTask({
        boardId: "",
        payload: {
          taskId,
        },
        res: (res: any) => {
          const { error } = res;
          // if (!error) modalDispatch({ type: ModalActionType.CLOSE });
        },
      });
    }
  };

  const openTaskEditModal = () => {
    // modalDispatch({
    //   type: ModalActionType.OPEN,
    //   payload: {
    //     title: "Edit Task",
    //     render: <TaskUpdate taskId={taskId} boardId={""} />,
    //   },
    // });
  };

  const isAuthorizedToEdit = () => {
    // const { role } = currentBoard;
    // return taskDetails.author._id === user._id || role === "OWNER" || role === "ADMIN";
    return true;
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
