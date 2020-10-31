import React, { useState, useContext, useEffect } from "react";
import * as Yup from "yup";
import "./BoardEditor.scss";
import Button from "components/Button/Button";
import { Formik, Field, Form } from "formik";
import TextInput from "components/TextInput/TextInput";
import { ModalContext } from "context/ModalContext";
import LoadingOverlay from "components/LoadingOverlay/LoadingOverlay";

import fetchData from "helper/fetchData";
import { useHistory } from "react-router-dom";
import { WarningNotificationContext } from "context/WarningNotificationContext";


const validationSchema = Yup.object({
	name: Yup.string().max(25, "board name is too long").required("field is required"),
	description: Yup.string().max(200, "description is too long"),
});

const BoardEditor = ({ boardId, submitType }) => {
	const [, dispatchModal] = useContext(ModalContext);
	const [, warningNotificationDispatch] = useContext(WarningNotificationContext);
	const [loadingBoardInfo, setLoadingBoardInfo] = useState(false);
	const [initialVals, setInitialVals] = useState({
		name: "",
		description: "",
	});

	const history = useHistory();

	useEffect(() => {
		const getBoardInfo = async () => {
			setLoadingBoardInfo(true);
			const { data } = await fetchData({
				method: "GET",
				url: `/board/${boardId}?short=true`,
				token: true,
			});
			if (!!data) {
				const { name, description } = data;
				setInitialVals({ name, description });
				setLoadingBoardInfo(false);
			}
		}
		if (submitType === "Update") getBoardInfo();
		return () => {}
	}, [boardId, submitType])

	const submitButtonClick = async (submittedData, { setSubmitting }) => {
		const { data } = await fetchData({
			method: "POST",
			url: `/board/${!!boardId ? boardId : ""}`,
			token: true,
			setLoading: setSubmitting,
			payload: submittedData,
		});
		if (!!data) {
			dispatchModal({ type: "CLOSE" });
			const boardId = data.board._id;
			warningNotificationDispatch({ type: "SUCCESS", payload: { message: data.message } })
			history.push(`/board/${boardId}`);
		}
	};

	return (
		<div className="board-form-container-wrapper">
			<LoadingOverlay show={loadingBoardInfo} opacity={0} >
				<div className="board-form-container">
					<Formik
						validationSchema={validationSchema}
						initialValues={initialVals}
						onSubmit={submitButtonClick}
					>
						{({ isSubmitting, isValid, errors }) => (
							<>
								<LoadingOverlay show={isSubmitting} opacity={0.5} />
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
										{submitType}
									</Button>
								</Form>
							</>
						)}
					</Formik>
				</div>
			</LoadingOverlay>
		</div>
	);
};

export default BoardEditor;
