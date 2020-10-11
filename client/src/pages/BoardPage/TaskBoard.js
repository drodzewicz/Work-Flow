import React, { useContext, useEffect } from "react";
import TaskColumn from "components/Task/TaskColumn";
import { TaskContext } from "context/TaskContext";
import NewColumn from "components/NewColumn/NewColumn";
import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom"

import { ws } from "socket";

const TaskBoard = ({ boardId }) => {
	const history = useHistory();
	const [tasks, setTasks] = useContext(TaskContext);


	useEffect(() => {
		const createSocketNewBoard = (newColumn) => {
			setTasks((tasks) => {
				const tempTasks = [...tasks];
				tempTasks.push(newColumn);
				return tempTasks;
			});
		};
		const deleteSocketColumn = (deleteResponse) => {
			setTasks((tasks) => {
				const newTasks = [...tasks];
				newTasks.splice(deleteResponse.index, 1);
				return newTasks;
			});
		};
		const moveSocketColumn = (moveResponse) => {
			setTasks((tasks) => {
				const tempTasks = [...tasks];
				const movingColumn = tempTasks.splice(moveResponse.source, 1)[0];
				tempTasks.splice(moveResponse.destination, 0, movingColumn);
				return tempTasks;
			});
		};
		const createTask = (data) => {
			const { success, task } = data;
			if (success) {
				setTasks((tasks) => {
					const tempTasks = [...tasks];
					tempTasks[task.columnIndex].tasks.push(task);
					return tempTasks;
				});
			}
		}
		const deleteTask = (data) => {
			const { success, error, index } = data;
			if (success) {
				setTasks((tasks) => {
					const newTasks = [...tasks];
					newTasks[index.col].tasks.splice(index.task, 1);
					return newTasks;
				});
			}
		}
		const moveTask = (data) => {
			const { success, source, destination, taskId } = data;
			if (success) {
				setTasks((taskColumns) => {
					if (taskColumns[destination.columnIndex]?.tasks[destination.taskIndex]?._id === taskId) {
						return taskColumns;
					} else {
						const tempTasks = [...taskColumns];
						const movingTask = tempTasks[source.columnIndex].tasks.splice(source.taskIndex, 1)[0];
						tempTasks[destination.columnIndex].tasks.splice(destination.taskIndex, 0, movingTask);
						return tempTasks;
					}
				});
			}

		}

		ws.on("createNewColumn", createSocketNewBoard);
		ws.on("deleteColumn", deleteSocketColumn);
		ws.on("moveColumn", moveSocketColumn);
		ws.on("createTask", createTask);
		ws.on("deleteTask", deleteTask);
		ws.on("moveTask", moveTask);
		return () => {
			ws.removeListener("createNewColumn", createSocketNewBoard);
			ws.removeListener("deleteColumn", deleteSocketColumn);
			ws.removeListener("moveColumn", moveSocketColumn);
			ws.removeListener("createTask", createTask);
			ws.removeListener("moveTask", moveTask);
		};
	}, [setTasks]);


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
				<NewColumn boardId={boardId} />
			</div>
		</div>
	);
};

TaskBoard.propTypes = {
	boardId: PropTypes.string.isRequired,
};

export default TaskBoard;
