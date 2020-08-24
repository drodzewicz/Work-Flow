import React, { useContext, useRef, useEffect } from "react";
import "./Task.scss";
import Image from "components/Image/Image";
import { TaskDisplay } from "modalForms";
import { ModalContext } from "context/ModalContext";
import Tooltip from "components/Tooltip/Tooltip";

import { Draggable } from "react-beautiful-dnd";

const Task = ({ taskId, name, index, tags, people, removeTask }) => {
	const [, modalDispatch] = useContext(ModalContext);

	const poepleAnchorElement = useRef();
	const tagsAnchorElement = useRef();

	const openTaskDetailsModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: {
				render: <TaskDisplay taskId={taskId} removeTask={removeTask} />,
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
		<Draggable draggableId={taskId} index={index}>
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
									tags.map(({ color, id, name }) => (
										<div key={id} className={`tag-mini ${color}`}></div>
									))}
							</div>
						</div>
						<Tooltip anchorEl={tagsAnchorElement} index={index} offset={{ x: 0, y: 0 }}>
							{tags && tags.map(({ id, name }) => <span key={id}>{name}</span>)}
						</Tooltip>
						<div className="task-people" ref={poepleAnchorElement}>
							{people && displayAssignedUsers(people)}
						</div>
						<Tooltip anchorEl={poepleAnchorElement} index={index}>
							{people && people.map(({ id, username }) => <span key={id}>{username}</span>)}
						</Tooltip>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default Task;
