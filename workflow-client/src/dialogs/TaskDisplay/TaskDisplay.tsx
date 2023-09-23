import React, { useRef } from "react";

import { FaEdit, FaEllipsisV, FaTrashAlt } from "react-icons/fa";

import useBoardTask from "@/hooks/useBoardTasks";
import useBoolean from "@/hooks/useBoolean";
import useRBAC from "@/hooks/useRBAC";

import { useGetTaskDetails, useDeleteTask } from "@/service/task";

import DropdownMenu from "@/components/general/DropdownMenu";
import DropdownMenuItem from "@/components/general/DropdownMenu/DropdownMenuItem";

import User from "@/components/board/User";

import TaskEditor from "@/dialogs/TaskEditor";

import "./TaskDisplay.scss";

export interface TaskDisplayProps {
  taskId: string;
}

const TaskDisplay: React.FC<TaskDisplayProps> = ({ taskId }) => {
  const {
    state: isEdditing,
    setTrue: setEdditingTrue,
    setFalse: setEdditingFalse,
  } = useBoolean(false);

  const { mutate: deleteTask } = useDeleteTask();
  const { data } = useGetTaskDetails({ taskId });

  const {
    data: { boardId },
  } = useBoardTask();
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
            {/* {taskDetails.tags.map(({ _id, color, name }) => (
              <Tag key={_id} colorCode={color} tagName={name} />
            ))} */}
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
