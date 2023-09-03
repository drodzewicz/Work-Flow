import React, { useRef, useState } from "react";

import { FaEdit, FaEllipsisV, FaTrashAlt } from "react-icons/fa";

import useBoardTask from "@/hooks/useBoardTasks";

import useGetTaskDetails from "@/service/useGetTaskDetails";

import DropdownMenu from "@/components/general/DropdownMenu";
import DropdownMenuItem from "@/components/general/DropdownMenu/DropdownMenuItem";

import User from "@/components/board/User";

import TaskEditor from "@/dialogs/TaskEditor";

import "./TaskDisplay.scss";

export interface TaskDisplayProps {
  taskId: string;
}

const TaskDisplay: React.FC<TaskDisplayProps> = ({ taskId }) => {
  const [isEdditing, setIsEdditing] = useState<boolean>(false);

  const { data } = useGetTaskDetails({ taskId });

  const {
    data: { boardId },
  } = useBoardTask();
  const anchorElement = useRef(null);

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
        <button onClick={() => setIsEdditing(false)}>Cancel</button>
      </>
    );
  }

  return (
    <section className="task-display">
      <header className="flex flex-row">
        <h1 className="flex-grow">{data?.title}</h1>
        <button type="button" ref={anchorElement}>
          <FaEllipsisV />
        </button>
        <DropdownMenu anchorEl={anchorElement} className="column-more-options">
          <DropdownMenuItem>
            <FaTrashAlt /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsEdditing(true)}>
            <FaEdit /> Edit
          </DropdownMenuItem>
        </DropdownMenu>
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
