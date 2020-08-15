import React, { useState, useContext, useRef } from "react";
import "./TaskColumn.scss";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Task from "./Task";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import { ModalContext } from "context/ModalContext";

import { NewTask } from "modalForms";

const TaskColumn = ({ columnName, listOfTasks }) => {

	const [, modalDispatch] = useContext(ModalContext);

	const anchorElement = useRef();

	const openBoardTagsModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: { render: <NewTask />, title: "Board Tags" },
		});
	};

	return (
		<div className="task-column">
			<div className="task-column-header">
				<h2 className="task-column-name">{columnName}</h2>
				<button onClick={openBoardTagsModal} className="add-new-task-btn">
					<PlaylistAddIcon />{" "}
				</button>
				<button ref={anchorElement} className="more-options">
					<MoreVertIcon />
				</button>
				<DropdownMenu anchorEl={anchorElement}>
					<span>delete</span>
					<span>edit</span>
				</DropdownMenu>
			</div>
			<div className={"task-container"}>
				{listOfTasks &&
					listOfTasks.map(({ id, name, tags, people, dueDate }) => (
						<Task
							key={id}
							taskId={id}
							name={name}
							tags={tags}
							people={people}
							dueDate={dueDate}
						/>
					))}
			</div>
		</div>
	);
};

export default TaskColumn;
