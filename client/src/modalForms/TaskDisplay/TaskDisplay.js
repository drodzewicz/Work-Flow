import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "./TaskDisplay.scss";
import User from "components/User/User";
import Tag from "components/Tag/Tag";
import Button from "components/Button/Button";

import { ModalContext } from "context/ModalContext";
import { UserContext } from "context/UserContext";

import TaskEditor from "modalForms/TaskEditor/TaskEditor";
import fetchData from "helper/fetchData";
import LoadingOverlay from "components/LoadingOverlay/LoadingOverlay";
import { emitWS } from "helper/socketData";


const TaskDisplay = ({ taskId, updateTask }) => {
	const [, dispatchModal] = useContext(ModalContext);
	const [{ currentBoard, user }] = useContext(UserContext);

	const [taskDetails, setTaskDetails] = useState({
		title: "",
		description: "",
		tags: [],
		taskAuthor: {
			_id: "loading",
			username: "loading",
		},
		peopleAssigned: [],
	});
	const [isTaskLoading, setTaskLoading] = useState(true);

	useEffect(() => {
		let _isMounted = true;
		const getTaskInfo = async () => {
			const { data } = await fetchData({
				method: "GET",
				url: `/board/${currentBoard.id}/task/${taskId}`,
				token: true,
			});
			if (_isMounted) setTaskLoading(false);
			if (!!data && _isMounted) {
				setTaskDetails({
					title: data.task.title,
					description: data.task.description,
					tags: data.task.tags,
					taskAuthor: data.task.author,
					peopleAssigned: data.task.people,
				});
			}
		};
		getTaskInfo();
		return () => {
			_isMounted = false;
		};
	}, [currentBoard.id, taskId]);

	const deleteTask = async () => {
		const shouldDelete = window.confirm("are you sure you want to delete this task?")
		if (shouldDelete) {
			emitWS({
				roomId: currentBoard.id,
				eventName: "deleteTask",
				token: true,
				payload: {
					taskId,
				},
				res: (res) => {
					if (res.success) dispatchModal({ type: "CLOSE" });
				}
			});
		}
	};

	const openTaskEditModal = () => {
		dispatchModal({
			type: "OPEN",
			payload: {
				title: "Edit Task",
				render: (
					<TaskEditor
						buttonName="Update"
						updateTask={updateTask}
						boardId={currentBoard.id}
						taskId={taskId}
						action={"UPDATE"}
						initialValues={{
							name: taskDetails.title,
							description: taskDetails.description,
							tags: taskDetails.tags,
							people: taskDetails.peopleAssigned,
						}}
					/>
				),
			},
		});
	};

	const isAuthorizedToEdit = () => {
		const { role } = currentBoard;
		return taskDetails.taskAuthor._id === user._id || role === "owner" || role === "admin";
	}

	return (
		<div className="display-task-wrapper">
			<LoadingOverlay show={isTaskLoading} opacity={0}>
				<div className="display-task">
					<div className="text-details">
						{isAuthorizedToEdit() &&
							<div className="info-header">
								<Button classes={["edit-btn delete-btn"]} clicked={deleteTask}>
									delete
								</Button>
								<Button classes={["edit-btn"]} clicked={openTaskEditModal}>
									edit
								</Button>
							</div>}

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
						<User
							username={taskDetails.taskAuthor.username}
							imageURL={taskDetails.taskAuthor.avatarImageURL}
						/>
						<h2 className="assigned-people-title user-title">People</h2>
						<div className="assigned-people-container">
							{taskDetails.peopleAssigned.map(({ _id, username, avatarImageURL }) => (
								<User key={_id} username={username} imageURL={avatarImageURL} />
							))}
						</div>
					</div>
				</div>
			</LoadingOverlay>
		</div>
	);
};

TaskDisplay.propTypes = {
	taskId: PropTypes.string.isRequired,
	updateTask: PropTypes.func.isRequired,
};

export default TaskDisplay;
