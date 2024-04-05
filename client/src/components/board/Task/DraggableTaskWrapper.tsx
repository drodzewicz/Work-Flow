import React, { PropsWithChildren } from "react";

import { Draggable } from "react-beautiful-dnd";

import "./Task.scss";

type DraggableTaskWrapperProps = {
    taskId: string;
    taskIndex: number;
    className?: string;
    isMovable?: boolean;
};
const DraggableTaskWrapper: React.FC<PropsWithChildren<DraggableTaskWrapperProps>> = ({
    taskId,
    taskIndex,
    children,
    className,
    isMovable = true,
}) => {
    return (
        <Draggable draggableId={taskId} index={taskIndex} isDragDisabled={!isMovable}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${snapshot.isDragging ? "task-card--dragging" : ""} ${className}`}
                    style={{ ...provided.draggableProps.style }}
                >
                    {children}
                </div>
            )}
        </Draggable>
    );
};

export default DraggableTaskWrapper;
