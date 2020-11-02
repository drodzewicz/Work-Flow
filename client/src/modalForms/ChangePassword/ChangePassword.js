import React, { useContext } from "react";
import * as Yup from "yup";
import SimpleForm from "components/SimpleForm/SimpleForm";
import { ModalContext } from "context/ModalContext";
import fetchData from "helper/fetchData";

const validationSchema = Yup.object({
	newPassword: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
	matchPassword: Yup.string()
		.oneOf([Yup.ref("newPassword")], "password does not match")
		.required("Password confirm is required"),
});

const fields = {
	newPassword: { initialVal: "", type: "password", label: "new password" },
	matchPassword: { initialVal: "", type: "password", label: "match password" },
};

const ChangePassword = () => {
	const [, modalDispatch] = useContext(ModalContext);

	const handleSubmit = async (submittedData, { setSubmitting, setErrors }) => {
		const { data, error } = await fetchData({
			method: "PATCH",
			url: "/user/change_password",
			token: true,
			setLoading: setSubmitting,
			payload: submittedData,
		});
		if (!!data) {
			modalDispatch({ type: "CLOSE" });
		} else if (!!error) {
			setErrors(error.message);
		}
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
