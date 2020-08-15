import React, { useContext } from "react";
import "./Task.scss";
import Image from "components/Image/Image";
import { TaskDisplay } from "modalForms";
import { ModalContext } from "context/ModalContext";

const Task = ({ taskId, name, tags, people, dueDate }) => {
	const [, modalDispatch] = useContext(ModalContext);

	const openTaskDetailsModal = (event) => {
		modalDispatch({
			type: "OPEN",
			payload: {
				render: <TaskDisplay taskId={taskId} />,
				title: "Task Details",
			},
		});
	};

	return (
		<div className="task-card" onClick={openTaskDetailsModal}>
			<div className="card-head">
				<div className="due-date">{dueDate}</div>
			</div>
			<h3 className="task-title">{name}</h3>
			<div className="card-bottom">
				<div className="task-tags">
					{tags &&
						tags.map((tag) => (
							<div key={tag} className="tag" style={{ backgroundColor: tag }}></div>
						))}
				</div>
				<div className="task-people">
					{people &&
						people.map(({ id, imageLink }) => (
							<Image key={id} classes={["avatar"]} imageLink={imageLink} />
						))}
				</div>
			</div>
		</div>
	);
};

export default Task;
