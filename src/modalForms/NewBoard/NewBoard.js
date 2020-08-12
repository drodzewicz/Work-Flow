import React, { useState } from "react";
import "./NewBoard.scss";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import User from "components/User/User";
import { TextField } from "@material-ui/core";
import Button from "components/Button/Button";
import { Formik, Field, Form } from "formik";
import AutoCompleteInput from "components/AutoCompleteInput/AutoCompleteInput";

const NewBoard = () => {
	const [users, setUsers] = useState([
		{ id: "1j2j3", username: "user1", imageLink: "link1" },
		{ id: "1j343", username: "user2", imageLink: "link1" },
		{ id: "1576j3", username: "user3", imageLink: "link1" },
		{ id: "1j2dd3", username: "user1", imageLink: "link1" },
		{ id: "1j3dd43", username: "user2", imageLink: "link1" },
		{ id: "15f7d6j3", username: "user3", imageLink: "link1" },
	]);

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
		const testVal = { ...data, taskUsers: users };
		console.log(`creating board: `, testVal);
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
						<Field
							className="board-name-input"
							variant="outlined"
							label={"board name"}
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
							clickResult={addUserToBoardHandler}
						/>
						<div className="user-card-container">
							{users.map(({ id, username, imageLink }) => (
								<User key={id} username={username} imageLink={imageLink}>
									<RemoveCircleOutlineIcon onClick={() => removeUserFromBoardHandler(id)} />
								</User>
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

export default NewBoard;
