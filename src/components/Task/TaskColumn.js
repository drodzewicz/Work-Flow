import React, { useContext, useRef } from "react";
import "./TaskColumn.scss";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Task from "./Task";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import { ModalContext } from "context/ModalContext";

import { NewTask } from "modalForms";
import { useDrop } from "react-dnd";
import { ItemTypes } from "utils/items";

const TaskColumn = ({
	columnName,
	listOfTasks,
	removeTask,
	removeColumn,
	columnIndex,
	moveHandler,
	move2,
}) => {
	const [, modalDispatch] = useContext(ModalContext);

	const anchorElement = useRef();

	const openBoardTagsModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: { render: <NewTask />, title: "New Task" },
		});
	};

	const [{ addedProps }, drop] = useDrop({
		accept: ItemTypes.TASK_CARD,
		// drop: (item, monitor) => {
		// 	moveHandler(item.columnIndex, item.taskIndex, columnIndex);
		// },
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	});

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
					<span onClick={removeColumn}>delete</span>
					<span>edit</span>
				</DropdownMenu>
			</div>
			<div ref={drop} className={"task-container"}>
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
							move2={move2}
							removeTask={() => {
								removeTask(id);
							}}
						/>
					))}
			</div>
		</div>
	);
};

export default TaskColumn;
