import React from "react";
import "./SimpleForm.scss";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import Button from "components/Button/Button";
import * as Yup from "yup";
import { ReactComponent as Spinner } from "assets/spinners/Infinity-1s-200px.svg";
import TextInput from "components/TextInput/TextInput";

const createInitialValueObject = (fieldObject) => {
	let initialValues = {};
	Object.keys(fieldObject).forEach((fieldName) => {
		initialValues[fieldName] = fieldObject[fieldName].initialVal;
	});
	return initialValues;
};

const SimpleForm = ({ submitButtonName, validationSchema, handleSubmit, fields, classes }) => {
	return (
		<div className={`simple-form-container ${classes.join(" ")}`}>
			<Formik
				validationSchema={validationSchema}
				initialValues={createInitialValueObject(fields)}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting, isValid, errors }) => (
					<>
						{isSubmitting && (
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
								disabled={isSubmitting || !isValid}
							>
								{submitButtonName}
							</Button>
						</Form>
					</>
				)}
			</Formik>
		</div>
	);
};

SimpleForm.defaultProps = {
	validationSchema: Yup.object({}),
	submitButtonName: "Submit",
	classes: [""],
};

SimpleForm.propTypes = {
	submitButtonName: PropTypes.string,
	validationSchema: PropTypes.object,
	handleSubmit: PropTypes.func.isRequired,
	fields: PropTypes.object.isRequired,
	classes: PropTypes.arrayOf(PropTypes.string),
};

export default SimpleForm;
