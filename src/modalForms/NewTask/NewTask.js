import React, { useState, useRef } from "react";
import "./NewTask.scss";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import User from "components/User/User";
import { TextField } from "@material-ui/core";
import Button from "components/Button/Button";
import { Formik, Field, Form } from "formik";
import AutoCompleteInput from "components/AutoCompleteInput/AutoCompleteInput";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import Tag from "components/Tag/Tag";

import { userList_DATA, tags_DATA } from "data";

const NewTask = ({columnIndex, addnewTask}) => {
	const [users, setUsers] = useState([]);

	const [boardTags, setBoardTags] = useState(tags_DATA);

	const tagChoiceButton = useRef();

	const [searchRes, setSearchRes] = useState([]);

	const initialValuse = {
		name: "",
		description: "",
	};


	const submitCreateTask = (data, { setSubmitting }) => {
		const seletctedTags = boardTags.filter(({selected}) => selected);
		const testVal = { ...data, id: data.name, people: users, tags: seletctedTags};
		console.log(`creating task: `, testVal);
		addnewTask(columnIndex, testVal); 
	};

	const dynamicSearchHandler = (data) => {
		console.log(`fethcing string ${data}`);
		// ... fetch to API
		const parsedResult = userList_DATA
			.filter((dbUsers) => users.findIndex((user) => user.id === dbUsers.id) < 0)
			.map((user) => ({
				...user,
				id: user.id,
				text: user.username,
			}));
		setSearchRes(parsedResult);
	};
	const addUserToTask = (user) => {
		setSearchRes([]);
		const tempUsers = [...users];
		tempUsers.push(user);
		// ..
		setUsers(tempUsers);
	};

	const clearSearchResults = () => {
		setSearchRes([]);
	};

	const removeUserFromTask = (userId) => {
		setUsers((currentUserList) => currentUserList.filter(({ id }) => id !== userId));
	};

	const toggleSelectTag = (tagId) => {
		setBoardTags((tags) => {
			const tempTags = [...tags];
			const tagIndex = tempTags.findIndex(({ id }) => id === tagId);
			tempTags[tagIndex].selected = !tempTags[tagIndex].selected;
			return tempTags;
		});
	};
	return (
		<div className="new-task-container">
			<Formik
				// validationSchema={validationSchema}
				initialValues={initialValuse}
				onSubmit={submitCreateTask}
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
							execMethod={dynamicSearchHandler}
							timeout={700}
							searchResult={searchRes}
							clickResult={addUserToTask}
							clearResults={clearSearchResults}
						/>
						<div className="user-card-container">
							{users.map(({ id, username, imageURL }) => (
								<User key={id} username={username} imageURL={imageURL}>
									<RemoveCircleOutlineIcon onClick={() => removeUserFromTask(id)} />
								</User>
							))}
						</div>
					</div>
					<div className="list-of-tags">
						<Button refEl={tagChoiceButton}>Choose Tags</Button>
						<DropdownMenu anchorEl={tagChoiceButton} classes={["tag-drop-down"]}>
							{boardTags
								.filter(({ selected }) => !selected)
								.map(({ id, color, name }) => (
									<div
										onClick={() => toggleSelectTag(id)}
										key={id}
										className={`tag-item ${color}`}
									>
										{name}
									</div>
								))}
						</DropdownMenu>
						<div className="chosen-tags-container">
							{boardTags
								.filter(({ selected }) => selected)
								.map(({ id, color, name }) => (
									<Tag
										key={id}
										deleteTag={() => toggleSelectTag(id)}
										tagName={name}
										colorCode={color}
									/>
								))}
						</div>
					</div>
					<Button classes={["btn-accent btn-submit"]} type="submit">
						Create
					</Button>
				</Form>
			</Formik>
		</div>
	);
};

export default NewTask;
