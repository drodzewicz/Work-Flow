import React, { useState, useContext } from "react";
import "./TaskDisplay.scss";
import User from "components/User/User";
import Tag from "components/Tag/Tag";
import Button from "components/Button/Button";

import { ModalContext } from "context/ModalContext";
import { singleTask_DATA } from "data";

// import EditTask from "modalForms/NewTask/EditTask";
import TaskEditor from "modalForms/NewTask/TaskEditor";

const TaskDisplay = ({ taskId, removeTask, updateTask }) => {
	const { name, description, author, tags, people } = singleTask_DATA;

	const [, dispatchModal] = useContext(ModalContext);
	

	const [taskDetails] = useState({
		title: name,
		description: description,
		tags: tags,
		taskAuthor: author,
		peopleAssigned: people,
	});

	const openTaskEditModal = () => {
			dispatchModal({
			type: "OPEN",
			payload: {
				title: "Edit Task",
				render: (
					<TaskEditor
						submitDataURL="POST task/update?"
						buttonName="Update"
						updateTask={updateTask}
						initialValues={ { name, description, tags, people }}
					/>
				),
			},
		});
	};

	return (
		<div className="display-task">
			<div className="text-details">
				<div className="info-header">
					<Button classes={["edit-btn delete-btn"]} clicked={removeTask}>
						delete
					</Button>
					<Button classes={["edit-btn"]} clicked={openTaskEditModal}>
						edit
					</Button>
				</div>

				<h1 className="task-title">{taskDetails.title}</h1>
				<p className="task-description">{taskDetails.description}</p>
				<div className="tag-container">
					{taskDetails.tags.map(({ id, color, name }) => (
						<Tag key={id} colorCode={color} tagName={name} />
					))}
				</div>
			</div>
			<div className="people-details">
				<h2 className="added-by user-title">Task Author</h2>
				<User username={taskDetails.taskAuthor.username} imageURL={taskDetails.taskAuthor.imageURL} />
				<h2 className="assigned-people-title user-title">People</h2>
				<div className="assigned-people-container">
					{taskDetails.peopleAssigned.map(({ id, username, imageURL }) => (
						<User key={id} username={username} imageURL={imageURL} />
					))}
				</div>
			</div>
		</div>
	);
};

export default TaskDisplay;
