import React, { useState, useRef, useEffect, useContext } from "react";
import * as Yup from "yup";
import "./TaskEditor.scss";
import { ReactComponent as Spinner } from "assets/spinners/Infinity-1s-200px.svg";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import User from "components/User/User";
import TextInput from "components/TextInput/TextInput";
import { UserContext } from "context/UserContext";
import { ModalContext } from "context/ModalContext";

import Button from "components/Button/Button";
import { Formik, Field, Form } from "formik";
import AutoCompleteInput from "components/AutoCompleteInput/AutoCompleteInput";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import Tag from "components/Tag/Tag";
import fetchData from "helper/fetchData";
import LoadingOverlay from "components/LoadingOverlay/LoadingOverlay";
import { emitWS } from "helper/socketData";

// import { userList_DATA, tags_DATA } from "data";

const validationSchema = Yup.object({
	title: Yup.string().max(25, "task title is too long").required("field is required"),
	description: Yup.string().max(200, "description is too long"),
});

const TaskEditor = ({ buttonName, action, updateTask, initialValues, boardId, taskId, columnId }) => {
	const tagChoiceButton = useRef();
	const [{ user }] = useContext(UserContext);
	const [, modalDispatch] = useContext(ModalContext);

	const initialVals = {
		title: initialValues ? initialValues.name : "",
		description: initialValues ? initialValues.description : "",
	};
	const [users, setUsers] = useState(initialValues ? [...initialValues.people] : []);
	const [userSearchResult, setUserSearchResult] = useState([]);

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
			// if(!!data) updateTask(addNewTaskToBoard)
		}

		// const addNewTaskToBoard = {
		// 	...submittedData,
		// 	people: users,
		// 	tags: chosenBoardTags,
		// 	_id: "" + Math.floor(Math.random() * 100),
		// };

		// const { data, error } = await fetchData({
		// 	method: "POST",
		// 	url: submitDataURL,
		// 	token: true,
		// 	setLoading: setSubmitting,
		// 	payload: submittingTask,
		// });
		// console.log(data, error);
		// if (addTask !== undefined) addTask(addNewTaskToBoard);
		// if (updateTask !== undefined) updateTask(addNewTaskToBoard);
	};

	// USER
	const clearUserSearchResults = () => {
		setUserSearchResult([]);
	};
	const searchUser = async (username) => {
		const { data } = await fetchData({
			method: "GET",
			url: `/board/${boardId}/members?username=${username}`,
			token: true,
		});
		setUserSearchResult(
			data
				.filter(({ user }) => users.findIndex(({ _id }) => _id === user._id) < 0)
				.map(({ user }) => ({ ...user, text: user.username }))
		);
	};
	const addUserToList = (user) => {
		setUsers((users) => {
			const newUsers = [...users];
			newUsers.push(user);
			return newUsers;
		});
		setUserSearchResult([]);
	};
	const removeUserFromList = (userIndex) => {
		setUsers((users) => {
			const newUsers = [...users];
			newUsers.splice(userIndex, 1);
			return newUsers;
		});
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
						{isSubmitting && (
							<div className="spinner-overlay">
								<Spinner />
							</div>
						)}
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
							<div className="user-container">
								<AutoCompleteInput
									execMethod={searchUser}
									timeout={700}
									searchResult={userSearchResult}
									clickResult={addUserToList}
									clearResults={clearUserSearchResults}
								/>
								<div
									className={`user-card-container ${users.length > 4 ? "overflow-scroll" : ""
										}`}
								>
									{users.map(({ _id, username, avatarImageURL }, index) => (
										<User key={_id} username={username} imageURL={avatarImageURL}>
											<RemoveCircleOutlineIcon
												className="remove-user-icon"
												onClick={() => removeUserFromList(index)}
											/>
										</User>
									))}
								</div>
							</div>
							<div className="list-of-tags">
								<Button refEl={tagChoiceButton}>Choose Tags</Button>
								<DropdownMenu
									offset={{ x: -102, y: 35 }}
									scrollableAt={160}
									anchorEl={tagChoiceButton}
									classes={["tag-drop-down"]}
								>
									{availableTags
										.filter(
											({ _id: tagId }) =>
												chosenBoardTags.findIndex(({ _id }) => _id === tagId) < 0
										)
										.map(({ _id, colorCode, name }, index) => (
											<div
												key={_id}
												onClick={() => addTagToList(_id)}
												className={`tag-item ${colorCode}`}
											>
												{name}
											</div>
										))}
								</DropdownMenu>
								<div className="chosen-tags-container">
									{chosenBoardTags.map(({ _id, colorCode, name }, index) => (
										<Tag
											key={_id}
											deleteTag={() => removeTagFromList(index)}
											tagName={name}
											colorCode={colorCode}
										/>
									))}
								</div>
							</div>
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
