import React, { useContext, useRef } from "react";
import PropTypes from "prop-types";
import "./Task.scss";
import Image from "components/general/Image";
import { TaskDisplay } from "components/modalForms";
import { ModalContext } from "context/ModalContext";
import { TaskContext } from "context/TaskContext";
import { UserContext } from "context/UserContext";
import Tooltip from "components/general/Tooltip/Tooltip";

import { Draggable } from "react-beautiful-dnd";

const Task = ({ taskId, title, indexes, tags, people }) => {
	const [, modalDispatch] = useContext(ModalContext);
	const [, setTasks] = useContext(TaskContext);
	const [{ currentBoard }] = useContext(UserContext);

	const poepleAnchorElement = useRef();
	const tagsAnchorElement = useRef();

	const { taskIndex, columnIndex } = indexes;

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
				render: <TaskDisplay taskId={taskId} updateTask={updateTask} />,
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
        {displayUsers.map(({ _id, avatarImageURL }) => (
          <Image key={_id} className="avatar" src={avatarImageURL} />
        ))}
        {maxUserAmount - userAmount < 0 && (
          <span className="additional-users">{`+${Math.abs(maxUserAmount - userAmount)}`}</span>
        )}
      </div>
    );
	};

	return (
		<Draggable draggableId={taskId} index={taskIndex} isDragDisabled={currentBoard.role === "guest"}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={`task-card ${snapshot.isDragging ? "isDragging" : ""}`}
					onClick={openTaskDetailsModal}
					style={{ ...provided.draggableProps.style }}
				>
					<h3 className="task-title">{title}</h3>
					<div className="card-bottom">
						<div className="task-tags">
							<div className="tags" ref={tagsAnchorElement}>
								{tags &&
									tags.map(({ colorCode, _id }) => (
										<div key={_id} className={`tag-mini ${colorCode}`}></div>
									))}
							</div>
						</div>
						<Tooltip anchorEl={tagsAnchorElement}>
							{tags && tags.map(({ _id, name }) => <span key={_id}>{name}</span>)}
						</Tooltip>
						<div className="task-people" ref={poepleAnchorElement}>
							{people && displayAssignedUsers(people)}
						</div>
						<Tooltip anchorEl={poepleAnchorElement}>
							{people && people.map(({ _id, username }) => <span key={_id}>{username}</span>)}
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
	title: PropTypes.string.isRequired,
	indexes: PropTypes.shape({ taskIndex: PropTypes.number, columnIndex: PropTypes.number }).isRequired,
	tags: PropTypes.array,
	people: PropTypes.array,
};

export default Task;
