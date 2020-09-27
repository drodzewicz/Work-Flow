import React, { useState, useContext, useEffect } from "react";
import "./TaskDisplay.scss";
import User from "components/User/User";
import Tag from "components/Tag/Tag";
import Button from "components/Button/Button";

import { ModalContext } from "context/ModalContext";
import { singleTask_DATA } from "data";

// import EditTask from "modalForms/NewTask/EditTask";
import TaskEditor from "modalForms/TaskEditor/TaskEditor";
import fetchData from "helper/fetchData";


const TaskDisplay = ({ taskId, boardId, removeTask, updateTask }) => {

	const [, dispatchModal] = useContext(ModalContext);

	const [taskDetails, setTaskDetails] = useState({
		title: "",
		description: "",
		tags: [],
		taskAuthor: "",
		peopleAssigned: [],
	});

	useEffect(() => {
		const getTaskInfo = async () => {
			console.log("lox")
			const { data } = await fetchData({
				method: "GET",
				url: `/board/${boardId}/task/${taskId}`,
				token: true,
			});
			console.log(data)
			if(!!data) setTaskDetails({
				title: data.task.title,
				description: data.task.description,
				tags: data.task.tags,
				taskAuthor: data.task.author,
				peopleAssigned: data.task.people
			})
		}
		getTaskInfo();
		return () => {};
	}, []);

	const deleteTask = async () => {
		const { status, data } = await fetchData({
				method: "DELETE",
				url: `/board/${boardId}/task/${taskId}`,
				token: true,
			});
			console.log(data)
		if(status === "200") removeTask()
		
	}

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
						initialValues={{ name: taskDetails.title, description: taskDetails.description, tags: taskDetails.tags, people: taskDetails.peopleAssigned }}
					/>
				),
			},
		});
	};

	return (
		<div className="display-task">
			<div className="text-details">
				<div className="info-header">
					<Button classes={["edit-btn delete-btn"]} clicked={deleteTask}>
						delete
					</Button>
					<Button classes={["edit-btn"]} clicked={openTaskEditModal}>
						edit
					</Button>
				</div>

				<h1 className="task-title">{taskDetails.title}</h1>
				<p className="task-description">{taskDetails.description}</p>
				<div className="tag-container">
					{taskDetails.tags.map(({ _id, colorCode, name }) => (
						<Tag key={_id} colorCode={colorCode} tagName={name} />
					))}
				</div>
			</div>
			<div className="people-details">
				<h2 className="added-by user-title">Task Author</h2>
				<User username={taskDetails.taskAuthor.username} imageURL={taskDetails.taskAuthor.avatarImageURL} />
				<h2 className="assigned-people-title user-title">People</h2>
				<div className="assigned-people-container">
					{taskDetails.peopleAssigned.map(({ _id, username, avatarImageURL }) => (
						<User key={_id} username={username} imageURL={avatarImageURL} />
					))}
				</div>
			</div>
		</div>
	);
};

export default TaskDisplay;
