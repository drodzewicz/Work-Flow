import React, { useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import "./TaskColumn.scss";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Task from "./Task";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import { ModalContext } from "context/ModalContext";
import { TaskContext } from "context/TaskContext";
import ColumnNameInput from "./ColumnNameInput";
import fetchData from "helper/fetchData";

import { Droppable } from "react-beautiful-dnd";

import { TaskEditor } from "modalForms";

const TaskColumn = ({ columnName, columnId, listOfTasks, columnIndex, boardId }) => {
	const [, modalDispatch] = useContext(ModalContext);
	const [, setTasks] = useContext(TaskContext);

	const [showTitleInput, setShowTitleInput] = useState(false);

	const anchorElement = useRef();

	const openBoardTagsModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: {
				render: (
					<TaskEditor
						columnId={columnId}
						boardId={boardId}
						addTask={addnewTask}
						submitDataURL="POST task/create?"
						buttonName="Create"
					/>
				),
				title: "New Task",
			},
		});
	};

	const removeColumn = async () => {
		const { data, error } = await fetchData({
			method: "DELETE",
			url: `/board/${boardId}/column/${columnId}`,
			token: true,
		});
		console.log(data, error);
		setTasks((tasks) => {
			const newTasks = [...tasks];
			newTasks.splice(columnIndex, 1);
			return newTasks;
		});
	};

	const addnewTask = (newTask) => {
		setTasks((tasks) => {
			const newTasks = [...tasks];
			newTasks[columnIndex].tasks.push(newTask);
			return newTasks;
		});
		modalDispatch({ type: "CLOSE" });
	};

	const changeColumnName = (newColumnName) => {
		setTasks((tasks) => {
			const tempTasks = [...tasks];
			const foundColumnIndex = tempTasks.findIndex(({ _id }) => _id === columnId);
			tempTasks[foundColumnIndex].name = newColumnName;
			return tempTasks;
		});
	};

	const activateColumnNameEditInput = () => {
		setShowTitleInput(true);
	};

	const onEnter = async (newName) => {
		const { data, error } = await fetchData({
			method: "PATCH",
			url: `/board/${boardId}/column/${columnId}`,
			token: true,
			payload: {
				name: newName,
			},
		});
		console.log(data, error);
		changeColumnName(newName);
		setShowTitleInput(false);
	};

	return (
		<Droppable droppableId={columnId} type="droppableTaskToColumn">
			{(provided, snapshot) => {
				return (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className={`task-column ${snapshot.isDraggingOver ? "active" : ""}`}
					>
						<div className="task-column-header">
							<span className="task-count">{listOfTasks.length}</span>
							{showTitleInput ? (
								<ColumnNameInput
									hideInput={() => setShowTitleInput(false)}
									initialVal={columnName}
									onEnter={onEnter}
								/>
							) : (
								<h2 className="task-column-name">{columnName}</h2>
							)}
							<button onClick={openBoardTagsModal} className="add-new-task-btn">
								<PlaylistAddIcon />
							</button>
							<button ref={anchorElement} className="more-options">
								<MoreVertIcon />
							</button>
							<DropdownMenu anchorEl={anchorElement}>
								<span onClick={removeColumn}>delete</span>
								<span onClick={activateColumnNameEditInput}>edit</span>
							</DropdownMenu>
						</div>
						<div className={"task-container"}>
							{listOfTasks &&
								listOfTasks.map(({ _id, title, tags, people }, index) => (
									<Task
										key={_id}
										taskId={_id}
										boardId={boardId}
										title={title}
										tags={tags}
										people={people}
										indexes={{ taskIndex: index, columnIndex }}
									/>
								))}
							{provided.placeholder}
						</div>
					</div>
				);
			}}
		</Droppable>
	);
};

TaskColumn.propTypes = {
	columnName: PropTypes.string.isRequired,
	columnId: PropTypes.string.isRequired,
	listOfTasks: PropTypes.array.isRequired,
	columnIndex: PropTypes.number.isRequired,
};

export default TaskColumn;
