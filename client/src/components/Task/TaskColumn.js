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
import { emitWS } from "helper/socketData";

import { Droppable } from "react-beautiful-dnd";

import { TaskEditor } from "modalForms";

const TaskColumn = ({ columnName, columnId, columnIndex, boardId, listOfTasks }) => {
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
						submitDataURL={`/board/${boardId}/task?columnId=${columnId}`}
						buttonName="Create"
					/>
				),
				title: "New Task",
			},
		});
	};

	const removeColumn = async () => {
		emitWS({
			roomId: boardId,
			eventName: "deleteColumn",
			token: true,
			payload: { columnId, columnIndex },
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

	const activateColumnNameEditInput = () => {
		setShowTitleInput(true);
	};
	const dissableColumnNameEditInput = () => {
		setShowTitleInput(false);
	};

	const changeColumnNameOnKeyPressEnter = async (newName) => {
		const { status } = await fetchData({
			method: "PATCH",
			url: `/board/${boardId}/column/${columnId}`,
			token: true,
			payload: {
				name: newName,
			},
		});
		if (status === 200) {
			setTasks((tasks) => {
				const tempTasks = [...tasks];
				const foundColumnIndex = tempTasks.findIndex(({ _id }) => _id === columnId);
				tempTasks[foundColumnIndex].name = newName;
				return tempTasks;
			});
			setShowTitleInput(false);
		}
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
							<ColumnNameInput
								hideInput={dissableColumnNameEditInput}
								initialVal={columnName}
								onEnter={changeColumnNameOnKeyPressEnter}
								editTitle={showTitleInput}
							/>
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
