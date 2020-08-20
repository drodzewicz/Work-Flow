import React, { useContext, useRef } from "react";
import "./TaskColumn.scss";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Task from "./Task";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import { ModalContext } from "context/ModalContext";

import { Droppable } from "react-beautiful-dnd";

import { NewTask } from "modalForms";

const TaskColumn = ({ columnName, columnId, listOfTasks, removeTask, removeColumn, columnIndex }) => {
	const [, modalDispatch] = useContext(ModalContext);

	const anchorElement = useRef();

	const openBoardTagsModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: { render: <NewTask />, title: "New Task" },
		});
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
							<h2 className="task-column-name">{columnName}</h2>
							<button onClick={openBoardTagsModal} className="add-new-task-btn">
								<PlaylistAddIcon />{" "}
							</button>
							<button ref={anchorElement} className="more-options">
								<MoreVertIcon />
							</button>
							<DropdownMenu anchorEl={anchorElement}>
								<span onClick={removeColumn}>delete</span>
								<span>edit</span>
							</DropdownMenu>
						</div>
						<div className={"task-container"}>
							{listOfTasks &&
								listOfTasks.map(({ id, name, tags, people }, index) => (
									<Task
										key={id}
										taskId={id}
										name={name}
										tags={tags}
										people={people}
										index={index}
										columnIndex={columnIndex}
										removeTask={() => {
											removeTask(id);
										}}
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

export default TaskColumn;
