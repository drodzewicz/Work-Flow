import React, { useState } from "react";
import "./NewTask.scss";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import User from "components/User/User";
import { TextField, TextareaAutosize } from "@material-ui/core";
import Button from "components/Button/Button";
import { Formik, Field, Form } from "formik";
import AutoCompleteInput from "components/AutoCompleteInput/AutoCompleteInput";

const NewTask = () => {
	const [users, setUsers] = useState([
		{ id: "1j2j3", username: "user1", imageLink: "link1" },
		{ id: "1j343", username: "user2", imageLink: "link1" },
		{ id: "1576j3", username: "user3", imageLink: "link1" },
	]);
	const [tags, setTags] = useState({
		red: "",
		yellow: "",
		green: "test",
		tiel: "",
		purple: "",
		majenta: "mest",
		pink: "1",
	});

	const [searchRes, setSearchRes] = useState([]);

	const initialValuse = {
		name: "",
		description: "",
	};

	const temmptUsers = [
		{ id: "1j2j3", username: "user1", imageLink: "link1" },
		{ id: "1j343", username: "user2", imageLink: "link1" },
		{ id: "1576j3", username: "user3", imageLink: "link1" },
		{ id: "675343", username: "user4", imageLink: "link1" },
	];

	const submitCreateBoard = (data, { setSubmitting }) => {
		console.log(`creating board: `, data);
	};

	const dynamicSearchHandler = (data) => {
		console.log(`fethcing string ${data}`);
		// ... fetch to API
		const parsedResult = temmptUsers
			.filter((dbUsers) => users.findIndex((user) => user.id === dbUsers.id) < 0)
			.map((user) => ({
				...user,
				id: user.id,
				text: user.username,
			}));
		setSearchRes(parsedResult);
	};
	const addUserToBoardHandler = (user) => {
		setSearchRes([]);
		const tempUsers = [...users];
		tempUsers.push(user);
		// ..
		setUsers(tempUsers);
	};
	const removeUserFromBoardHandler = (userId) => {
		setUsers((currentUserList) => currentUserList.filter(({ id }) => id !== userId));
	};
	return (
		<div className="board-form-container">
			<Formik
				// validationSchema={validationSchema}
				initialValues={initialValuse}
				onSubmit={submitCreateBoard}
			>
				<Form>
					<div className="fields">
						<Field label={"task"} name={"name"} type={"text"} as={TextField} />
						<Field
							label={"description"}
							name={"description"}
							type={"text"}
							rowsMax={4}
							placeholder="Maximum 4d rows"
							as={TextareaAutosize}
						/>
						<div className="tags-container">
							{Object.entries(tags).map(([color, tagName]) => (
								<div key={color} title={tagName} className={`tag-color ${color}`}></div>
							))}
						</div>
					</div>
					<div className="user-container">
						<AutoCompleteInput
							execMethod={dynamicSearchHandler}
							timeout={500}
							searchResult={searchRes}
							clickResult={addUserToBoardHandler}
						/>
						{users.map(({ id, username, imageLink }) => (
							<User key={id} username={username} imageLink={imageLink}>
								<RemoveCircleOutlineIcon onClick={() => removeUserFromBoardHandler(id)} />
							</User>
						))}
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
