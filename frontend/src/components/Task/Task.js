import React, { useContext, useRef } from "react";
import PropTypes from "prop-types";
import "./Task.scss";
import Image from "components/Image/Image";
import { TaskDisplay } from "modalForms";
import { ModalContext } from "context/ModalContext";
import { TaskContext } from "context/TaskContext";
import Tooltip from "components/Tooltip/Tooltip";

import { Draggable } from "react-beautiful-dnd";

const Task = ({ taskId, name, indexes, tags, people }) => {
	const [, modalDispatch] = useContext(ModalContext);
	const [, setTasks] = useContext(TaskContext);

	const poepleAnchorElement = useRef();
	const tagsAnchorElement = useRef();

	const { taskIndex, columnIndex } = indexes;

	const removeTask = () => {
		setTasks((tasks) => {
			const tempTasks = [...tasks];
			tempTasks[columnIndex].tasks.splice(taskIndex, 1);
			return tempTasks;
		});
		modalDispatch({ type: "CLOSE" });
	};

	const updateTask = (updatedTask) => {
		setTasks((tasks) => {
			const tempTasks = [...tasks];
			tempTasks[columnIndex].tasks[taskIndex] = updatedTask;
			return tempTasks;
		});
		modalDispatch({ type: "CLOSE" });
	};

	const openTaskDetailsModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: {
				render: <TaskDisplay taskId={taskId} removeTask={removeTask} updateTask={updateTask} />,
				title: "Task Details",
			},
		});
	};

	const displayAssignedUsers = (users) => {
		const maxUserAmount = 3;
		const userAmount = users.length;
		let displayUsers = [];
		if (userAmount > maxUserAmount) {
			displayUsers = users.slice(0, maxUserAmount);
		} else {
			displayUsers = users;
		}

		return (
			<div className="task-user-wrapper">
				{displayUsers.map(({ id, imageURL }) => (
					<Image key={id} classes={["avatar"]} imageURL={imageURL} />
				))}
				{maxUserAmount - userAmount < 0 && (
					<span className="additional-users">{`+${Math.abs(maxUserAmount - userAmount)}`}</span>
				)}
			</div>
		);
	};

	return (
		<Draggable draggableId={taskId} index={taskIndex}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={`task-card ${snapshot.isDragging ? "isDragging" : ""}`}
					onClick={openTaskDetailsModal}
					style={{ ...provided.draggableProps.style }}
				>
					<h3 className="task-title">{name}</h3>
					<div className="card-bottom">
						<div className="task-tags">
							<div className="tags" ref={tagsAnchorElement}>
								{tags &&
									tags.map(({ color, id }) => (
										<div key={id} className={`tag-mini ${color}`}></div>
									))}
							</div>
						</div>
						<Tooltip anchorEl={tagsAnchorElement}>
							{tags && tags.map(({ id, name }) => <span key={id}>{name}</span>)}
						</Tooltip>
						<div className="task-people" ref={poepleAnchorElement}>
							{people && displayAssignedUsers(people)}
						</div>
						<Tooltip anchorEl={poepleAnchorElement}>
							{people && people.map(({ id, username }) => <span key={id}>{username}</span>)}
						</Tooltip>
					</div>
				</div>
			)}
		</Draggable>
	);
};

Task.defaultProps = {
	tags: undefined,
	people: undefined,
};
Task.propTypes = {
	taskId: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	indexes: PropTypes.shape({ taskIndex: PropTypes.number, columnIndex: PropTypes.number }).isRequired,
	tags: PropTypes.array,
	people: PropTypes.array,
};

export default Task;
