import React from "react";
import * as Yup from "yup";
import SimpleForm from "components/SimpleForm/SimpleForm";

const validationSchema = Yup.object({
	password: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
	matchPassword: Yup.string()
		.oneOf([Yup.ref("password")], "password does not match")
		.required("Password confirm is required"),
});

const fields = {
	password: { initialVal: "", type: "password" },
	matchPassword: { initialVal: "", type: "password", label: "match password" },
};

const ChangePassword = ({ passwordConfirmationMethod }) => {
	const handleSubmit = (data, { setSubmitting }) => {
		setSubmitting(true);
		console.log("submited", data);
		setTimeout(() => {
			setSubmitting(false);
		}, 2000);
	};

	return (
		<div className="change-password-modal">
			<SimpleForm
				submitButtonName="change password"
				validationSchema={validationSchema}
				handleSubmit={handleSubmit}
				fields={fields}
			/>
		</div>
	);
};

export default ChangePassword;
