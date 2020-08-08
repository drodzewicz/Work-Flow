import React from "react";
import * as Yup from "yup";
import SimpleForm from "components/SimpleForm/SimpleForm";

const validationSchema = Yup.object({
	username: Yup.string().max(25, "username is too long").required("field is required"),
	password: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
});

const fields = {
	username: { initialVal: "", type: "text" },
	password: { initialVal: "", type: "password" },
};

const handleSubmit = (data, { setSubmitting }) => {
	setSubmitting(true);
	console.log("submited", data);
	setTimeout(() => {
		setSubmitting(false);
	}, 2000);
};

const Login = () => {
	return (
		<SimpleForm
			submitButtonName="Login"
			validationSchema={validationSchema}
			handleSubmit={handleSubmit}
			fields={fields}
		/>
	);
};

export default Login;
