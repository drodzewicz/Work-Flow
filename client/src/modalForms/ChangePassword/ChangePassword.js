import React, { useContext } from "react";
import * as Yup from "yup";
import SimpleForm from "components/SimpleForm/SimpleForm";
import { useCallFetchData } from "Hooks/useFetch";
import { ModalContext } from "context/ModalContext";

const validationSchema = Yup.object({
	newPassword: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
	matchPassword: Yup.string()
		.oneOf([Yup.ref("newPassword")], "password does not match")
		.required("Password confirm is required"),
});

const fields = {
	newPassword: { initialVal: "", type: "password" },
	matchPassword: { initialVal: "", type: "password", label: "match password" },
};

const ChangePassword = () => {
	const [, modalDispatch] = useContext(ModalContext);

	const [, changePasswordCallAPI] = useCallFetchData({
		url: "/user/change_password",
		method: "PATCH",
		token: true,
	});

	const handleSubmit = async (submittedData, { setSubmitting, setErrors }) => {
		setSubmitting(true);
		try {
			const {data, error} = await changePasswordCallAPI(submittedData);
			if(!!data) {
				modalDispatch({ type: "CLOSE" });
			} else if (!!error) {
				setErrors(error.data.message)
			}
		} catch (error) {
			setSubmitting(false);
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
