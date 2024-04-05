import React, { PropsWithChildren } from "react";

import { Droppable } from "react-beautiful-dnd";

const DroppableColumnWrapper: React.FC<PropsWithChildren<{ className?: string }>> = ({
    children,
    className,
}) => {
    return (
        <Droppable droppableId="droppable" type="droppableColumn" direction="horizontal">
            {(provided) => {
                return (
                    <div className={className} ref={provided.innerRef}>
                        {children}
                        {provided.placeholder}
                    </div>
                );
            }}
        </Droppable>
    );
};

export default DroppableColumnWrapper;
