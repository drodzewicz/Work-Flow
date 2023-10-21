import React from "react";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useQueryClient } from "react-query";

import useBoardId from "@/hooks/useBoardId";
import useBoolean from "@/hooks/useBoolean";
import useRBAC from "@/hooks/useRBAC";

import { useGetTaskDetails, useDeleteTask, taskQueryKeys } from "@/service/task";

import ItemContainer from "@/components/layout/ItemContainer/ItemContainer";
import * as Skeleton from "@/components/layout/Skeleton";

import TagCard from "@/components/board/TagCard/TagCard";
import User from "@/components/board/User";

import TaskEditor from "@/dialogs/TaskEditor";

import "./TaskDisplay.scss";

export interface TaskDisplayProps {
  taskId: string;
  closeModal?: () => void;
}

const TaskDisplay: React.FC<TaskDisplayProps> = ({ taskId, closeModal }) => {
  const boardId = useBoardId();

  const canEditTask = useRBAC({ boardId, action: "TASK_CREATE" });
  const canDeleteTask = useRBAC({ boardId, action: "TASK_DELETE" });

  const {
    state: isEditing,
    setTrue: setEditingTrue,
    setFalse: setEditingFalse,
  } = useBoolean(false);

  const queryClient = useQueryClient();
  const { mutate: deleteTask } = useDeleteTask({
    onSuccess: () => {
      queryClient.invalidateQueries(taskQueryKeys.list(boardId));
      closeModal?.();
    },
  });
  const { data, isLoading } = useGetTaskDetails({ taskId });

  if (isEditing) {
    return (
      <TaskEditor
        boardId={boardId}
        onCancel={setEditingFalse}
        isEditing={true}
        initialValues={{
          title: data?.title,
          description: data?.description,
          assignees: data?.assignees,
          tags: data?.tags,
        }}
      />
    );
  }

  return (
    <section className="task-display">
      <header>
        <h1 className="task-display__title">{data?.title || "loading..."}</h1>
        <div className="task-display__sub">
          <ItemContainer<Tag>
            itemKey="_id"
            items={data?.tags}
            className="task-display__tag-container"
            render={({ key, name }) => <TagCard name={name} color={key} />}
          />
          <div className="task-display__action-buttons">
            {canDeleteTask && (
              <button className="btn" onClick={() => deleteTask(taskId)}>
                <FaTrashAlt /> Delete
              </button>
            )}
            {canEditTask && (
              <button className="btn" onClick={setEditingTrue}>
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
              {(data?.assignees?.length || 0) > 1 && `Assignees (${data?.assignees?.length})`}
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
