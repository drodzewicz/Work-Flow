import React, { useState, useEffect, useContext } from "react";
import * as Yup from "yup";
import "./TaskEditor.scss";
import TextInput from "components/TextInput/TextInput";
import { UserContext } from "context/UserContext";
import { ModalContext } from "context/ModalContext";

import Button from "components/Button/Button";
import { Formik, Field, Form } from "formik";
import fetchData from "helper/fetchData";
import LoadingOverlay from "components/LoadingOverlay/LoadingOverlay";
import { emitWS } from "helper/socketData";
import TagChoiceControll from "./TagChoiceControll";
import UserListManager from "./UserListManager";

// import { userList_DATA, tags_DATA } from "data";

const validationSchema = Yup.object({
	title: Yup.string().max(25, "task title is too long").required("field is required"),
	description: Yup.string().max(200, "description is too long"),
});

const TaskEditor = ({ buttonName, action, updateTask, initialValues, boardId, taskId, columnId }) => {
	// REOMVE this user and verify on backend using token
	const [{ user }] = useContext(UserContext);
	const [, modalDispatch] = useContext(ModalContext);

	const initialVals = {
		title: initialValues ? initialValues.name : "",
		description: initialValues ? initialValues.description : "",
	};
	const [users, setUsers] = useState(initialValues ? [...initialValues.people] : []);

	const [availableTags, setAvailableTags] = useState([]);
	const [chosenBoardTags, setChosenBoardTags] = useState(initialValues ? [...initialValues.tags] : []);

	useEffect(() => {
		//  fetch all available tags at mount of  the component
		const getBoardTags = async () => {
			const { data } = await fetchData({
				method: "GET",
				url: `/board/${boardId}/tag`,
				token: true,
			});
			if (!!data) setAvailableTags(data.tags);

		}
		getBoardTags();
		return () => { };
	}, [boardId]);

	const submitOnButtonClick = async (submittedData, { setSubmitting }) => {
		const submittingTask = {
			...submittedData,
			people: users.map(({ _id }) => _id),
			tags: chosenBoardTags.map(({ _id }) => _id),
		};
		if (action === "CREATE") {
			emitWS({
				roomId: boardId,
				eventName: "createTask",
				token: true,
				payload: {
					authorId: user._id,
					...submittingTask,
					columnId,
				},
				res: (res) => {
					if (res.success) modalDispatch({ type: "CLOSE" });
				}
			});
		} else if (action === "UPDATE") {
			const { data } = await fetchData({
				method: "POST",
				url: `/board/${boardId}/task/${taskId}`,
				token: true,
				setLoading: setSubmitting,
				payload: submittingTask,
			});
			if (!!data) updateTask(data.task)
		}
	};

	// TAGS
	const addTagToList = (tagId) => {
		const foundTag = availableTags.find(({ _id }) => _id === tagId);
		setChosenBoardTags((tags) => {
			const newTags = [...tags];
			newTags.push(foundTag);
			return newTags;
		});
	};
	const removeTagFromList = (tagIndex) => {
		setChosenBoardTags((tags) => {
			const newTags = [...tags];
			newTags.splice(tagIndex, 1);
			return newTags;
		});
	};

	return (
		<div className="new-task-container">
			<Formik
				validationSchema={validationSchema}
				initialValues={initialVals}
				onSubmit={submitOnButtonClick}
			>
				{({ isSubmitting, isValid, errors }) => (
					<>
						<LoadingOverlay show={isSubmitting} ></LoadingOverlay>
						<Form>
							<div className="fields">
								<Field
									className="new-task-input"
									label={"task title"}
									name={"title"}
									hasErrors={!!errors["title"]}
									helperText={errors["title"]}
									classes={["board-name-field"]}
									as={TextInput}
								/>
								<Field
									classes={["board-description-field"]}
									name={"description"}
									hasErrors={!!errors["description"]}
									helperText={errors["description"]}
									multiline={{ rows: 7, max: 7 }}
									as={TextInput}
								/>
							</div>
							<UserListManager
								users={users}
								user={user}
								setUsers={setUsers}
								boardId={boardId}
							/>
							<TagChoiceControll
								availableTags={availableTags}
								chosenBoardTags={chosenBoardTags}
								removeTagFromList={removeTagFromList}
								addTagToList={addTagToList}
							/>
							<Button
								disabled={isSubmitting || !isValid}
								classes={["btn-accent btn-submit"]}
								type="submit"
							>
								{buttonName}
							</Button>
						</Form>
					</>
				)}
			</Formik>
		</div>
	);
};


export default TaskEditor;
