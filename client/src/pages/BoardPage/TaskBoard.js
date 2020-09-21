import React, { useState, useContext } from "react";
import TaskColumn from "components/Task/TaskColumn";
import { TaskContext } from "context/TaskContext";
import NewColumn from "components/NewColumn/NewColumn";
import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";

const TaskBoard = ({boardId}) => {
	const [tasks, setTasks] = useContext(TaskContext);

	const appendNewColumn = (newColumn) => {
		setTasks((tasks) => {
			const tempTasks = [...tasks];
			tempTasks.push(newColumn);
			return tempTasks;
		});
	};

	const DraggableTaskColumn = (id, name, tasks, index) => {
		return (
			<Draggable key={id} draggableId={id} index={index}>
				{(provided, snapshot) => {
					return (
						<div
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
						>
							<TaskColumn
								key={id}
								columnId={id}
								columnIndex={index}
								columnName={name}
								listOfTasks={tasks}
								boardId={boardId}
							/>
						</div>
					);
				}}
			</Draggable>
		);
	};

	return (
		<div className="board-page-container">
			<Droppable droppableId="droppable" type="droppableColumn" direction="horizontal">
				{(provided, snapshot) => {
					return (
						<div className="board-page-flex" ref={provided.innerRef}>
							{tasks.map(({ _id, name, tasks }, index) =>
								DraggableTaskColumn(_id, name, tasks, index)
							)}
							{provided.placeholder}
						</div>
					);
				}}
			</Droppable>
			<div>
				<NewColumn boardId={boardId} appendNewColumn={appendNewColumn} />
			</div>
		</div>
	);
};

TaskBoard.propTypes = {
	boardId: PropTypes.string.isRequired
}

export default TaskBoard;
