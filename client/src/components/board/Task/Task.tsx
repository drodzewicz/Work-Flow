import React from "react";

import useBoardId from "@/hooks/useBoardId";

import ItemContainer from "@/components/layout/ItemContainer";

import TaskAssignees from "@/components/board/Task/TaskAssignees";
import DraggableTaskWrapper from "@/components/board/Task/DraggableTaskWrapper";

import "./Task.scss";

import TagCard from "../TagCard/TagCard";
import useRBAC from "@/hooks/useRBAC";
import useRedirect from "@/hooks/useRedirect";

export interface TaskProps {
    taskId: string;
    title: string;
    indexes: {
        taskIndex: number;
        columnIndex: number;
    };
    tags?: Tag[];
    assignees?: User[];
}

const Task: React.FC<TaskProps> = ({ taskId, title, indexes, tags = [], assignees = [] }) => {
    const { goTo } = useRedirect();
    const boardId = useBoardId();
    const { hasAccess: canMoveTask } = useRBAC({ boardId, action: "TASK_MOVE" });

    const openTaskModal = () => {
        goTo.task(boardId, taskId);
    };

    return (
        <DraggableTaskWrapper
            className="task-card"
            taskId={taskId}
            taskIndex={indexes.taskIndex}
            isMovable={canMoveTask}
        >
            <div data-testid="task-card" onClick={openTaskModal}>
                <h3 className="task-card__title" title={title}>
                    {title}
                </h3>
                <div className="task-card__bottom">
                    <ItemContainer<Tag>
                        itemKey="_id"
                        items={tags}
                        className="task-card__tags"
                        noContentMessage=""
                        render={({ key, name }) => <TagCard name={name} color={key} />}
                    />
                    <TaskAssignees assignees={assignees} />
                </div>
            </div>
        </DraggableTaskWrapper>
    );
};

export default Task;
