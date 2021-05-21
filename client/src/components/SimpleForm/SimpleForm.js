import React from "react";
import "./SimpleForm.scss";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import Button from "components/general/Button/Button";
import * as Yup from "yup";
import TextInput from "components/general/TextInput/TextInput";
import LoadingOverlay from "components/layout/LoadingOverlay/LoadingOverlay";

const createInitialValueObject = (fieldObject) => {
	let initialValues = {};
	Object.keys(fieldObject).forEach((fieldName) => {
		initialValues[fieldName] = fieldObject[fieldName].initialVal;
	});
	return initialValues;
};

const SimpleForm = ({
	submitButtonName,
	validationSchema,
	handleSubmit,
	fields,
	classes,
	loadingOverlayColor,
}) => {
	return (
    <div className={`simple-form-container ${classes.join(" ")}`}>
      <Formik
        validationSchema={validationSchema}
        initialValues={createInitialValueObject(fields)}
        onSubmit={handleSubmit}>
        {({ isSubmitting, isValid, errors }) => (
          <>
            <LoadingOverlay show={isSubmitting} opacity={0.5} color={loadingOverlayColor} />
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
                variant="glow"
                className="btn-submit"
                type="submit"
                disabled={isSubmitting || !isValid}>
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
	loadingOverlayColor: undefined,
};

SimpleForm.propTypes = {
	submitButtonName: PropTypes.string,
	validationSchema: PropTypes.object,
	handleSubmit: PropTypes.func.isRequired,
	fields: PropTypes.object.isRequired,
	classes: PropTypes.arrayOf(PropTypes.string),
	loadingOverlayColor: PropTypes.shape({ light: PropTypes.string, dark: PropTypes.string }),
};

export default SimpleForm;
