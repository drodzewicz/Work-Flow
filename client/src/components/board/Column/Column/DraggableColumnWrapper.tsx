import React, { PropsWithChildren } from "react";

import { Draggable } from "react-beautiful-dnd";

import { ColumnProps } from "./Column";

type DraggableColumnWrapperProps = ColumnProps &
    PropsWithChildren<{ className?: string; isMovable?: boolean }>;

const DraggableColumnWrapper: React.FC<DraggableColumnWrapperProps> = ({
    columnId,
    columnIndex,
    children,
    className,
    isMovable = true,
}) => {
    return (
        <Draggable draggableId={columnId} index={columnIndex} isDragDisabled={!isMovable}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={className}
                >
                    {children}
                </div>
            )}
        </Draggable>
    );
};

export default DraggableColumnWrapper;
