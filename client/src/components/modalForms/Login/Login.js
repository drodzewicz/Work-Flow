import React, { useContext } from "react";
import * as Yup from "yup";
import "./Login.scss";
import { UserContext, UserActionType } from "context/UserContext";
import { ModalContext, ModalActionType } from "context/ModalContext";
import { login } from "service";
import SimpleForm from "components/SimpleForm/SimpleForm";

const validationSchema = Yup.object({
	username: Yup.string().max(25, "username is too long").required("field is required"),
	password: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
});

const fields = {
	username: { initialVal: "", type: "text" },
	password: { initialVal: "", type: "password" },
};

const Login = () => {
	const { userDispatch } = useContext(UserContext);
	const { modalDispatch} = useContext(ModalContext);

	const handleSubmit = async (submittedData, { setSubmitting, setErrors }) => {
		const { data, error } = await login({ setLoading: setSubmitting, payload: submittedData });
		if (!!data) {
			const { token, user } = data;
			userDispatch({ type: UserActionType.LOGIN_SUCCESS, payload: { user, token } });
			modalDispatch({ type: ModalActionType.CLOSE });
		} else if (!!error) {
			setErrors({ username: "bad username", password: "bad password" });
		}
	};

	return (
		<div className={`simple-form-container login-form`}>
			<SimpleForm
				submitButtonName="LogIn"
				validationSchema={validationSchema}
				handleSubmit={handleSubmit}
				fields={fields}
			/>
		</div>
	);
};

export default Login;
