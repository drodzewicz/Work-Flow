import React from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskColumn from "./TaskColumn";

const DraggableColumn = ({ columnId, columnName, listOfTasks, columnIndex, removeTask, removeColumn }) => {
	return (
		<Draggable draggableId={columnId} index={columnIndex}>
			{(provided, snapshot) => {
				return (
					<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
						<TaskColumn
							columnId={columnId}
							columnIndex={columnIndex}
							removeTask={removeTask}
							removeColumn={() => removeColumn(columnIndex)}
							columnName={columnName}
							listOfTasks={listOfTasks}
						/>
					</div>
				);
			}}
		</Draggable>
	);
};

export default DraggableColumn;
