import React, { useContext, useEffect } from "react";
import * as Yup from "yup";
import { ModalContext } from "context/ModalContext";
import "./Register.scss";
import fetchData from "helper/fetchData";
import SimpleForm from "components/SimpleForm/SimpleForm";
import { Login } from "modalForms";

const validationSchema = Yup.object({
	username: Yup.string().max(25, "username is too long").required("field is required"),
	password: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
	matchPassword: Yup.string()
		.oneOf([Yup.ref("password")], "password does not match")
		.required("Password confirm is required"),
	email: Yup.string().email().required("field is required"),
	name: Yup.string().max(25, "name is too long").required("field is required"),
	surname: Yup.string().max(25, "surname is too long").required("field is required"),
});

const fields = {
	username: { initialVal: "", type: "text" },
	password: { initialVal: "", type: "password" },
	matchPassword: { initialVal: "", type: "password", label: "match password" },
	email: { initialVal: "", type: "email" },
	name: { initialVal: "", type: "name" },
	surname: { initialVal: "", type: "surname" },
};

const Register = () => {
	const [, modalDispatch] = useContext(ModalContext);
	let openLoginAfterRegisterTimeOut = null;

	useEffect(() => {
		return () => {
			clearTimeout(openLoginAfterRegisterTimeOut);
		};
	}, [openLoginAfterRegisterTimeOut]);

	const handleSubmit = async (submittedData, { setErrors, setSubmitting }) => {
		const { data, error } = await fetchData({
			method: "POST",
			url: "/register",
			setLoading: setSubmitting,
			payload: submittedData,
		});
		if (!!data) {
			modalDispatch({ type: "CLOSE" });
			openLoginAfterRegisterTimeOut = setTimeout(() => {
				modalDispatch({ type: "OPEN", payload: { render: <Login />, title: "LogIn" } });
			}, 1000);
		}
		if (!!error) setErrors(error.message);
	};

	return (
		<div className={`simple-form-container register-form`}>
			<SimpleForm
				submitButtonName="Register"
				validationSchema={validationSchema}
				handleSubmit={handleSubmit}
				fields={fields}
			/>
		</div>
	);
};

export default Register;
