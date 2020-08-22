import React, { useState, useContext } from "react";
import TaskColumn from "components/Task/TaskColumn";
import { ModalContext } from "context/ModalContext";

import { Droppable, Draggable } from "react-beautiful-dnd";

const TaskBoard = ({ tasks, setTasks }) => {
	const [, modalDispatch] = useContext(ModalContext);

	const [newColumn, setNewColumn] = useState("");

	const handleNewColumnChange = (event) => {
		setNewColumn(event.target.value);
	};
	const createNewColumn = (event) => {
		if (event.key === "Enter" && newColumn !== "") {
			setNewColumn("");
			const submittedColumn = {
				id: newColumn,
				name: newColumn,
				tasks: [],
			};
			setTasks((tasks) => {
				const tempTasks = [...tasks];
				tempTasks.push(submittedColumn);
				return tempTasks;
			});
		}
	};
	const removeColumn = (columnIndex) => {
		setTasks((tasks) => {
			const newTasks = [...tasks];
			newTasks.splice(columnIndex, 1);
			return newTasks;
		});
	};
	const removeTask = (columnIndex, taskIndex) => {
		setTasks((tasks) => {
			const tempTasks = [...tasks];
			tempTasks[columnIndex].tasks.splice(taskIndex, 1);
			return tempTasks;
		});
		modalDispatch({ type: "CLOSE" });
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
								removeTask={removeTask}
								removeColumn={() => removeColumn(index)}
								columnName={name}
								listOfTasks={tasks}
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
							{tasks.map(({ id, name, tasks }, index) =>
								DraggableTaskColumn(id, name, tasks, index)
							)}
							{provided.placeholder}
						</div>
					);
				}}
			</Droppable>
			<div>
				<div className="add-new-column">
					<input
						onKeyDown={createNewColumn}
						value={newColumn}
						onChange={handleNewColumnChange}
						type="text"
						placeholder="+ new column"
					/>
				</div>
			</div>
		</div>
	);
};

export default TaskBoard;
