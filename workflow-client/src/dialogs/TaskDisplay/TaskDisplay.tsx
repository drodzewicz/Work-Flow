import React, { useRef } from "react";

import { FaEdit, FaEllipsisV, FaTrashAlt } from "react-icons/fa";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

import useBoolean from "@/hooks/useBoolean";
import useRBAC from "@/hooks/useRBAC";

import { useGetTaskDetails, useDeleteTask, taskQueryKeys } from "@/service/task";

import DropdownMenu from "@/components/general/DropdownMenu";
import DropdownMenuItem from "@/components/general/DropdownMenu/DropdownMenuItem";

import User from "@/components/board/User";

import TaskEditor from "@/dialogs/TaskEditor";

import "./TaskDisplay.scss";

export interface TaskDisplayProps {
  taskId: string;
  closeModal?: () => void;
}

const TaskDisplay: React.FC<TaskDisplayProps> = ({ taskId, closeModal }) => {
  const {
    state: isEdditing,
    setTrue: setEdditingTrue,
    setFalse: setEdditingFalse,
  } = useBoolean(false);

  const queryClient = useQueryClient();
  const { mutate: deleteTask } = useDeleteTask({
    onSuccess: () => {
      queryClient.invalidateQueries(taskQueryKeys.list(boardId));
      closeModal?.();
    },
  });
  const { data } = useGetTaskDetails({ taskId });

  const { id: boardId = "" } = useParams();
  const anchorElement = useRef(null);

  const canEditTask = useRBAC({ boardId, action: "TASK_CREATE" });
  const canDeleteTask = useRBAC({ boardId, action: "TASK_DELETE" });

  if (isEdditing) {
    return (
      <>
        <TaskEditor
          boardId={boardId}
          initialValues={{
            title: data?.title,
            description: data?.description,
            assignees: data?.assignees,
            tags: data?.tags,
          }}
        />
        <button onClick={setEdditingFalse}>Cancel</button>
      </>
    );
  }

  return (
    <section className="task-display">
      <header className="flex flex-row">
        <h1 className="flex-grow">{data?.title}</h1>
        {(canEditTask || canDeleteTask) && (
          <>
            <button type="button" ref={anchorElement}>
              <FaEllipsisV />
            </button>
            <DropdownMenu anchorEl={anchorElement} className="column-more-options">
              {canDeleteTask && (
                <DropdownMenuItem onClick={() => deleteTask(taskId)}>
                  <FaTrashAlt /> Delete
                </DropdownMenuItem>
              )}
              {canEditTask && (
                <DropdownMenuItem onClick={setEdditingTrue}>
                  <FaEdit /> Edit
                </DropdownMenuItem>
              )}
            </DropdownMenu>
          </>
        )}
      </header>
      <hr className="break-line" />
      <article className="task-display__body">
        <div className="task-display__body__content">
          <div className="task-display__body__content__tags">
            {data?.tags.map(({ _id, key, name }) => (
              <div key={_id} style={{ background: key }}>
                {name}
              </div>
            ))}
          </div>
          <p className="task-display__body__content__description">{data?.description}</p>
        </div>
        <aside className="task-display__body__people">
          <div className="task-display__body__people__author">
            <label className="task-display__body__people__label">Author</label>
            <User username={data?.author.username ?? ""} imageSrc={data?.author.avatarImageURL} />
          </div>
          <label className="task-display__body__people__label">Asignees</label>
          <div className="task-display__body__people__asignees scrollbar">
            {data?.assignees.length === 0 && (
              <i className="task-display__body__people__message">No user has been assinged</i>
            )}
            {data?.assignees.map(({ _id, username, avatarImageURL }) => (
              <User key={_id} username={username} imageSrc={avatarImageURL} />
            ))}
          </div>
        </aside>
      </article>
    </section>
  );
};

export default TaskDisplay;
