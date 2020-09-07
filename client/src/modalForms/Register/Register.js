import React, { useContext } from "react";
import * as Yup from "yup";
import { useCallFetchData } from "Hooks/useFetch";
import { Formik, Field, Form } from "formik";
import TextInput from "components/TextInput/TextInput";
import Button from "components/Button/Button";
import { ReactComponent as Spinner } from "assets/spinners/Infinity-1s-200px.svg";
import { ModalContext } from "context/ModalContext";
import "./Register.scss";

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

const createInitialValueObject = (fieldObject) => {
	let initialValues = {};
	Object.keys(fieldObject).forEach((fieldName) => {
		initialValues[fieldName] = fieldObject[fieldName].initialVal;
	});
	return initialValues;
};

const fields = {
	username: { initialVal: "", type: "text" },
	password: { initialVal: "", type: "password" },
	matchPassword: { initialVal: "", type: "password", label: "match password" },
	email: { initialVal: "", type: "email" },
	name: { initialVal: "", type: "name" },
	surname: { initialVal: "", type: "surname" },
};

const Register = () => {
	const [, dispatchUser] = useContext(ModalContext);

	const [registerResponse, registerCallAPI] = useCallFetchData({
		url: "/register",
		method: "POST",
	});

	const handleSubmit = async (data, { setErrors }) => {
		const response = await registerCallAPI(data);
		if (!!response.error) setErrors(response.error.data.message);
		if (!!response.data) dispatchUser({ type: "CLOSE" });
	};

	return (
		<div className={`simple-form-container register-form`}>
			<Formik
				validationSchema={validationSchema}
				initialValues={createInitialValueObject(fields)}
				onSubmit={handleSubmit}
			>
				{({ isValid, errors }) => (
					<>
						{registerResponse.isLoading && (
							<div className="spinner-overlay">
								<Spinner />
							</div>
						)}
						<Form>
							{Object.entries(fields).map(([field]) => (
								<Field
									key={field}
									hasErrors={!!errors[field]}
									helperText={errors[field]}
									label={fields[field].label}
									name={field}
									type={fields[field].type}
									as={TextInput}
								/>
							))}
							<Button
								classes={["btn-accent", "btn-submit"]}
								type="submit"
								disabled={registerResponse.isLoading || !isValid}
							>
								Register
							</Button>
						</Form>
					</>
				)}
			</Formik>
		</div>
	);
};

export default Register;
