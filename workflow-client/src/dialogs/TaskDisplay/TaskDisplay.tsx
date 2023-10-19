import React from "react";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useQueryClient } from "react-query";

import useBoardId from "@/hooks/useBoardId";
import useBoolean from "@/hooks/useBoolean";
import useRBAC from "@/hooks/useRBAC";

import { useGetTaskDetails, useDeleteTask, taskQueryKeys } from "@/service/task";

import ItemContainer from "@/components/layout/ItemContainer/ItemContainer";
import * as Skeleton from "@/components/layout/Skeleton";

import User from "@/components/board/User";

import TaskEditor from "@/dialogs/TaskEditor";

import "./TaskDisplay.scss";

import TaskTags from "./TaskTags";

export interface TaskDisplayProps {
  taskId: string;
  closeModal?: () => void;
}

const TaskDisplay: React.FC<TaskDisplayProps> = ({ taskId, closeModal }) => {
  const boardId = useBoardId();

  const canEditTask = useRBAC({ boardId, action: "TASK_CREATE" });
  const canDeleteTask = useRBAC({ boardId, action: "TASK_DELETE" });

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
  const { data, isLoading } = useGetTaskDetails({ taskId });

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
      <header>
        <h1 className="task-display__title">{data?.title || "loading..."}</h1>
        <div className="task-display__sub">
          <TaskTags tags={data?.tags} />
          <div className="task-display__action-buttons">
            {canDeleteTask && (
              <button className="btn" onClick={() => deleteTask(taskId)}>
                <FaTrashAlt /> Delete
              </button>
            )}
            {canEditTask && (
              <button className="btn" onClick={setEdditingTrue}>
                <FaEdit /> Edit
              </button>
            )}
          </div>
        </div>
      </header>
      <hr className="break-line" />
      <article className="task-display__body">
        <div className="task-display__main-content">
          <p>{data?.description}</p>
          {!data?.description && <i>Empty description</i>}
        </div>
        <aside className="task-display__sidebar">
          <div className="task-display__author">
            <label>Author</label>
            <Skeleton.Container show={isLoading} count={1} element={<Skeleton.User />}>
              <User username={data?.author.username ?? ""} imageSrc={data?.author.avatarImageURL} />
            </Skeleton.Container>
          </div>
          <div className="task-display__assignees">
            <label>
              {data?.assignees?.length === 1 && "Assignee"}
              {(data?.assignees?.length || 0) > 1 && `Assignee (${data?.assignees?.length})`}
            </label>
            <Skeleton.Container show={isLoading} count={2} element={<Skeleton.User />}>
              <ItemContainer<User>
                itemKey="_id"
                items={data?.assignees}
                maxHeight={120}
                render={({ username, avatarImageURL }) => (
                  <User username={username} imageSrc={avatarImageURL} />
                )}
              />
            </Skeleton.Container>
          </div>
        </aside>
      </article>
    </section>
  );
};

export default TaskDisplay;
