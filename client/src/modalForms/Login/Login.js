import React, { useContext } from "react";
import * as Yup from "yup";
import "./Login.scss";
import { Formik, Field, Form } from "formik";
import Button from "components/Button/Button";
import { ReactComponent as Spinner } from "assets/spinners/Infinity-1s-200px.svg";
import TextInput from "components/TextInput/TextInput";
import { UserContext } from "context/UserContext";
import { ModalContext } from "context/ModalContext";
import fetchData from "helper/fetchData";

const validationSchema = Yup.object({
	username: Yup.string().max(25, "username is too long").required("field is required"),
	password: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
});

const fields = {
	username: "",
	password: "",
};

const Login = () => {
	const [, userDispatch] = useContext(UserContext);
	const [, modalDispatch] = useContext(ModalContext);

	const handleSubmit = async (submittedData, { setSubmitting, setErrors }) => {
		const {data, error} = await fetchData({
			method: "POST",
			url: "/login",
			setLoading: setSubmitting,
			payload: submittedData,
		});
		if (!!data) {
			const { token, user } = data;
			userDispatch({ type: "LOGIN", payload: { user, token } });
			modalDispatch({ type: "CLOSE" });
		} else if(!!error) {
			setErrors({username: "bad username", password: "bad password"})
		}
	};

	return (
		<div className={`simple-form-container login-form`}>
			<Formik validationSchema={validationSchema} initialValues={fields} onSubmit={handleSubmit}>
				{({ isSubmitting, isValid, errors }) => (
					<>
						{isSubmitting && (
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
