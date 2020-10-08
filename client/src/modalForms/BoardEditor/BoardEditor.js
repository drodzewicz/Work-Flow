import React, { useContext } from "react";
import * as Yup from "yup";
import "./BoardEditor.scss";
import { ReactComponent as Spinner } from "assets/spinners/Infinity-1s-200px.svg";
import Button from "components/Button/Button";
import { Formik, Field, Form } from "formik";
import TextInput from "components/TextInput/TextInput";
import { ModalContext } from "context/ModalContext";

import fetchData from "helper/fetchData";
import { useHistory } from "react-router-dom";

// import { userList_DATA } from "data";

const validationSchema = Yup.object({
	name: Yup.string().max(25, "board name is too long").required("field is required"),
	description: Yup.string().max(200, "description is too long"),
});

const BoardEditor = ({ submitDataURL, buttonName, initialValues }) => {
	const [, dispatchModal] = useContext(ModalContext);

	const history = useHistory();

	const initialVals = {
		name: initialValues ? initialValues.name : "",
		description: initialValues ? initialValues.description : "",
	};

	const submitButtonClick = async (submittedData, { setSubmitting }) => {
		const { data } = await fetchData({
			method: "POST",
			url: submitDataURL,
			token: true,
			setLoading: setSubmitting,
			payload: submittedData,
		});
		if (!!data) {
			dispatchModal({ type: "CLOSE" });
			const boardId = data.board._id;
			history.push(`/board/${boardId}`);
		}
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
