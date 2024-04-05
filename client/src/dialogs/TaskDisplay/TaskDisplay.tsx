import React from "react";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useBoardId from "@/hooks/useBoardId";
import useBoolean from "@/hooks/useBoolean";
import useRBAC from "@/hooks/useRBAC";

import { useGetTaskDetails, useDeleteTask, taskQueryKeys, useUpdateTask } from "@/service/task";
import { emitWebSocket } from "@/service/utils/emitWebSocket";

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

    const navigate = useNavigate();

    const { hasAccess: canEditTask } = useRBAC({ boardId, action: "TASK_CREATE" });
    const { hasAccess: canDeleteTask } = useRBAC({ boardId, action: "TASK_DELETE" });

    const {
        state: isEditing,
        setTrue: setEditingTrue,
        setFalse: setEditingFalse,
    } = useBoolean(false);

    const queryClient = useQueryClient();
    const { mutate: deleteTask } = useDeleteTask({
        onSuccess: () => {
            queryClient.invalidateQueries(taskQueryKeys.list(boardId));
            emitWebSocket(boardId, { event: "task-update", type: "DELETE" });

            closeModal?.();
        },
    });

    const deleteTaskHandler = (taskId: string) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this task?");
        if (shouldDelete) {
            deleteTask(taskId);
        }
    };

    const { data, isLoading } = useGetTaskDetails({
        taskId,
        onError: (err) => {
            if (err.response?.status === 404) {
                toast.warning(err.response.data.message || "Not found");
                navigate(`/board/${boardId}`);
            }
        },
    });

    const { mutate: updateTask } = useUpdateTask({ taskId, boardId });

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
                onSubmit={(values) => {
                    updateTask(values);
                    setEditingFalse();
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
                            <button className="btn" onClick={() => deleteTaskHandler(taskId)}>
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
                            <User
                                username={data?.author.username ?? ""}
                                imageSrc={data?.author.avatarImageURL}
                            />
                        </Skeleton.Container>
                    </div>
                    <div className="task-display__assignees">
                        <label>
                            {data?.assignees?.length === 1 && "Assignee"}
                            {(data?.assignees?.length || 0) > 1 &&
                                `Assignees (${data?.assignees?.length})`}
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
