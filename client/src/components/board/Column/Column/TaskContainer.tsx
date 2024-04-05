import React from "react";

import useBoardId from "@/hooks/useBoardId";

import { useGetTasks } from "@/service/task";

import Task from "@/components/board/Task";

import DroppableTaskWrapper from "./DroppableTaskWrapper";

const TaskContainer: React.FC<{ columnId: string; columnIndex: number }> = ({
    columnId,
    columnIndex,
}) => {
    const boardId = useBoardId();
    const { data = [] } = useGetTasks({ boardId });
    const tasks = data[columnIndex]?.tasks;

    return (
        <DroppableTaskWrapper columnId={columnId} className="task-column__container scrollbar">
            {tasks?.map(({ _id, title, tags, assignees }, index) => (
                <Task
                    key={_id}
                    taskId={_id}
                    title={title}
                    tags={tags}
                    assignees={assignees}
                    indexes={{ taskIndex: index, columnIndex }}
                />
            ))}
        </DroppableTaskWrapper>
    );
};

export default TaskContainer;
