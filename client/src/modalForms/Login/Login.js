import React, { useContext } from "react";
import * as Yup from "yup";
import "./Login.scss";
import { useCallFetchData } from "Hooks/useFetch";
import { Formik, Field, Form } from "formik";
import Button from "components/Button/Button";
import { ReactComponent as Spinner } from "assets/spinners/Infinity-1s-200px.svg";
import TextInput from "components/TextInput/TextInput";
import { UserContext } from "context/UserContext";
import { ModalContext } from "context/ModalContext";

const validationSchema = Yup.object({
	username: Yup.string().max(25, "username is too long").required("field is required"),
	password: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
});

const fields = {
	username: "",
	password: "",
};

const Login = () => {
	const [loginResponse, loginCallAPI] = useCallFetchData({
		url: "/login",
		method: "POST",
	});

	const [, userDispatch] = useContext(UserContext);
	const [, modalDispatch] = useContext(ModalContext);

	const handleSubmit = async (data) => {
		const response = await loginCallAPI(data);
		if (!!response.data) {
			const { token, user } = response.data;
			userDispatch({ type: "LOGIN", payload: { user, token } });
			modalDispatch({ type: "CLOSE" });
		}
	};

	return (
		<div className={`simple-form-container login-form`}>
			<Formik validationSchema={validationSchema} initialValues={fields} onSubmit={handleSubmit}>
				{({ isValid, errors }) => (
					<>
						{loginResponse.isLoading && (
							<div className="spinner-overlay">
								<Spinner />
							</div>
						)}
						<Form>
							<Field
								hasErrors={!!errors["username"] || !!loginResponse.error}
								helperText={!!loginResponse.error ? "bad username" : errors["username"]}
								name="username"
								as={TextInput}
							/>
							<Field
								hasErrors={!!errors["password"] || !!loginResponse.error}
								helperText={!!loginResponse.error ? "bad password" : errors["password"]}
								name="password"
								type="password"
								as={TextInput}
							/>
							<Button
								classes={["btn-accent", "btn-submit"]}
								type="submit"
								disabled={loginResponse.isLoading || !isValid}
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
