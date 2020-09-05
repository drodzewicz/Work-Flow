import React, { useEffect } from "react";
import * as Yup from "yup";
import "./Login.scss";
import { useFetchData } from "Hooks/useFetch";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import Button from "components/Button/Button";
import { ReactComponent as Spinner } from "assets/spinners/Infinity-1s-200px.svg";
import TextInput from "components/TextInput/TextInput";

const validationSchema = Yup.object({
	username: Yup.string().max(25, "username is too long").required("field is required"),
	password: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
});

const fields = {
	username: "",
	password: "",
};

const Login = () => {
	const [res, callAPI] = useFetchData({
		url: "http://localhost:8080/api/login",
		method: "POST",
	});

	const handleSubmit = async (data, { setSubmitting }) => {
		callAPI(data);
		// setSubmitting(true);
		// try {
		// 	const res = await axios.post("http://localhost:8080/api/login", data);
		// 	console.log(res.data);
		// 	setSubmitting(false);
		// } catch (error) {
		// 	console.log();
		// 	setSubmitting(false);
		// }
	};

	return (
		// <div>
		// 	<SimpleForm
		// 		classes={["login-form"]}
		// 		submitButtonName="Login"
		// 		validationSchema={validationSchema}
		// 		handleSubmit={handleSubmit}
		// 		fields={fields}
		// 	/>
		// </div>
		<div className={`simple-form-container login-form`}>
			<Formik
				validationSchema={validationSchema}
				initialValues={fields}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting, isValid, errors }) => (
					<>
						{res.isLoading && (
							<div className="spinner-overlay">
								<Spinner />
							</div>
						)}
						<Form>
							<Field
								hasErrors={!!errors["username"]}
								helperText={errors["username"]}
								name="username"
								as={TextInput}
							/>
							<Field
								hasErrors={!!errors["password"]}
								helperText={errors["password"]}
								name="password"
								type="password"
								as={TextInput}
							/>
							<Button
								classes={["btn-accent", "btn-submit"]}
								type="submit"
								disabled={isSubmitting || !isValid}
							>
								Log in
							</Button>
						</Form>
					</>
				)}
			</Formik>
		</div>
	);
};

export default Login;
