import React, { useState } from "react";
import * as Yup from "yup";
import "./BoardEditor.scss";
import { ReactComponent as Spinner } from "assets/spinners/Infinity-1s-200px.svg";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import User from "components/User/User";
import Button from "components/Button/Button";
import { Formik, Field, Form } from "formik";
import TextInput from "components/TextInput/TextInput";
import AutoCompleteInput from "components/AutoCompleteInput/AutoCompleteInput";

import { userList_DATA } from "data";

const validationSchema = Yup.object({
	name: Yup.string().max(25, "board name is too long").required("field is required"),
	description: Yup.string().max(200, "description is too long"),
});

const BoardEditor = ({ submitDataURL, buttonName, addBoard, updateBoard, initialValues }) => {
	const [users, setUsers] = useState([]);

	const [searchRes, setSearchRes] = useState([]);

	const initialVals = {
		name: initialValues ? initialValues.name : "",
		description: initialValues ? initialValues.description : "",
	};

	const submitButtonClick = (data, { setSubmitting }) => {
		const submittedData = { ...data, taskUsers: users };
		console.log("submitted board: ", submittedData, `to [${submitDataURL}]`);
		// if (addBoard !== undefined) addBoard(submittedData);
		// if (updateBoard !== undefined) updateBoard(submittedData);
	};
	const searchUsers = (data) => {
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
	const clearUserSearchResults = () => {
		setSearchRes([]);
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
				validationSchema={validationSchema}
				initialValues={initialVals}
				onSubmit={submitButtonClick}
			>
				{({ isSubmitting, isValid, errors }) => (
					<>
						{isSubmitting && (
							<div className="spinner-overlay">
								<Spinner />
							</div>
						)}
						<Form>
							<div className="fields">
								<Field
									className="board-name-input"
									label="board name"
									name="name"
									hasErrors={!!errors["name"]}
									helperText={errors["name"]}
									classes={["board-name-field"]}
									as={TextInput}
								/>
								<Field
									name={"description"}
									classes={["board-description-field"]}
									multiline={{ rows: 7, max: 7 }}
									hasErrors={!!errors["description"]}
									helperText={errors["description"]}
									as={TextInput}
								/>
							</div>
							<div className="user-container">
								<AutoCompleteInput
									execMethod={searchUsers}
									timeout={700}
									searchResult={searchRes}
									clickResult={addUserToBoardHandler}
									clearResults={clearUserSearchResults}
								/>
								<div
									className={`user-card-container ${
										users.length > 4 ? "overflow-scroll" : ""
									}`}
								>
									{users.map(({ id, username, imageURL }) => (
										<User key={id} username={username} imageURL={imageURL}>
											<RemoveCircleOutlineIcon
												onClick={() => removeUserFromBoardHandler(id)}
											/>
										</User>
									))}
								</div>
							</div>
							<Button
								disabled={isSubmitting || !isValid}
								classes={["btn-accent", "btn-submit"]}
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

export default BoardEditor;
