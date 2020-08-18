import React, { useContext, useRef } from "react";
import "./Task.scss";
import Image from "components/Image/Image";
import { TaskDisplay } from "modalForms";
import { ModalContext } from "context/ModalContext";
import Tooltip from "components/Tooltip/Tooltip";

const Task = ({ taskId, name, tags, people, removeTask }) => {
	const [, modalDispatch] = useContext(ModalContext);

	const poepleAnchorElement = useRef();
	const tagsAnchorElement = useRef();

	const openTaskDetailsModal = (event) => {
		modalDispatch({
			type: "OPEN",
			payload: {
				render: <TaskDisplay taskId={taskId} removeTask={removeTask} />,
				title: "Task Details",
			},
		});
	};

	return (
		<div className="task-card" onClick={openTaskDetailsModal}>
			<h3 className="task-title">{name}</h3>
			<div className="card-bottom">
				<div className="task-tags">
					<div className="tags" ref={tagsAnchorElement}>
						{tags &&
							tags.map((tag) => (
								<div key={tag} className="tag" style={{ backgroundColor: tag }}></div>
							))}
					</div>
				</div>
				<Tooltip anchorEl={tagsAnchorElement}>
					{tags && tags.map((tag) => <span key={tag}>{tag}</span>)}
				</Tooltip>
				<div className="task-people" ref={poepleAnchorElement}>
					{people &&
						people.map(({ id, imageLink }) => (
							<Image key={id} classes={["avatar"]} imageLink={imageLink} />
						))}
				</div>
				<Tooltip anchorEl={poepleAnchorElement}>
					{people && people.map(({ id, username }) => <span key={id}>{username}</span>)}
				</Tooltip>
			</div>
		</div>
	);
};

export default Task;
