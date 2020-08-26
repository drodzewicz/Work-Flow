import React, { useState, useRef, useEffect } from "react";
import "./TaskEditor.scss";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import User from "components/User/User";
import { TextField } from "@material-ui/core";
import Button from "components/Button/Button";
import { Formik, Field, Form } from "formik";
import AutoCompleteInput from "components/AutoCompleteInput/AutoCompleteInput";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import Tag from "components/Tag/Tag";

import { userList_DATA, tags_DATA } from "data";

const TaskEditor = ({ submitDataURL, buttonName, addTask, updateTask, initialValues }) => {
	const tagChoiceButton = useRef();

	const initialValuse = {
		name: initialValues ? initialValues.name : "",
		description: initialValues ? initialValues.description : "",
	};
	const [users, setUsers] = useState(initialValues ? [...initialValues.people] : []);
	const [userSearchResult, setUserSearchResult] = useState([]);

	const [availableTags, setAvailableTags] = useState([]);
	const [chosenBoardTags, setChosenBoardTags] = useState(initialValues ? [...initialValues.tags] : []);

	useEffect(() => {
		//  fetch all available tags at mount of  the component
		setAvailableTags(tags_DATA);
		return () => {};
	}, []);

	const submitOnButtonClick = (data, { setSubmitting }) => {
		console.log(`submitting to [${submitDataURL}]:`, data);
		const submittingTask = { ...data, people: users, tags: chosenBoardTags, id: data.name};
		if (addTask !== undefined) addTask(submittingTask);
		if (updateTask !== undefined) updateTask(submittingTask);
	};

	// USER
	const clearUserSearchResults = () => {
		setUserSearchResult([]);
	};
	const searchUser = (data) => {
		console.log(`fethcing users from [ board/memebers] based on: ${data}`);
		// fetch datat from API and update userSearchState
		setUserSearchResult(userList_DATA.map((users) => ({ ...users, text: users.username })));
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
	const addTagToList = (tagIndex) => {
		setChosenBoardTags((tags) => {
			const newTags = [...tags];
			newTags.push(availableTags[tagIndex]);
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
				// validationSchema={validationSchema}
				initialValues={initialValuse}
				onSubmit={submitOnButtonClick}
			>
				<Form>
					<div className="fields">
						<Field
							className="new-task-input"
							variant="outlined"
							label={"task name"}
							name={"name"}
							type={"text"}
							as={TextField}
						/>
						<Field
							label={"description"}
							name={"description"}
							type={"text"}
							rowsMax={7}
							multiline
							rows={7}
							variant="outlined"
							as={TextField}
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
						<div className="user-card-container">
							{users.map(({ id, username, imageURL }, index) => (
								<User key={id} username={username} imageURL={imageURL}>
									<RemoveCircleOutlineIcon onClick={() => removeUserFromList(index)} />
								</User>
							))}
						</div>
					</div>
					<div className="list-of-tags">
						<Button refEl={tagChoiceButton}>Choose Tags</Button>
						<DropdownMenu anchorEl={tagChoiceButton} classes={["tag-drop-down"]}>
							{availableTags.map(({ id, color, name }, index) => (
								<div
									onClick={() => addTagToList(index)}
									key={id}
									className={`tag-item ${color}`}
								>
									{name}
								</div>
							))}
						</DropdownMenu>
						<div className="chosen-tags-container">
							{chosenBoardTags.map(({ id, color, name }, index) => (
								<Tag
									key={id}
									deleteTag={() => removeTagFromList(index)}
									tagName={name}
									colorCode={color}
								/>
							))}
						</div>
					</div>
					<Button classes={["btn-accent btn-submit"]} type="submit">
						{buttonName}
					</Button>
				</Form>
			</Formik>
		</div>
	);
};

export default TaskEditor;
