import React, { useContext } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import TextInput from "components/general/TextInput/TextInput";
import Button from "components/general/Button/Button";
import { register } from "service";
import { ModalContext } from "context/ModalContext";
import { WarningNotificationContext } from "context/WarningNotificationContext";
import LoadingOverlay from "components/layout/LoadingOverlay/LoadingOverlay";

const validationSchema = Yup.object({
  email: Yup.string().email().required("field is required"),
  username: Yup.string()
    .min(3, "username is too short")
    .max(25, "username is too long")
    .required("field is required"),
  password: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
  matchPassword: Yup.string()
    .oneOf([Yup.ref("password")], "password does not match")
    .required("Password confirm is required"),
});

const fieldTypes = {
  email: "email",
  username: "text",
  password: "password",
  matchPassword: "password",
};

const RegisterStage2 = ({ initialFieldValues, changeStage }) => {
  const [, modalDispatch] = useContext(ModalContext);
  const [, warningNotificationDispatch] = useContext(WarningNotificationContext);

  const handleGoBackStage = () => {
    changeStage((stage) => stage - 1);
  };

  const createFields = () => {
    let fieldVals = {};
    Object.keys(fieldTypes).forEach(
      (fieldName) => (fieldVals[fieldName] = initialFieldValues[fieldName])
    );
    return fieldVals;
  };

  const submitRegistrationForm = async (submittedData, { setErrors, setSubmitting }) => {
    const { error, status } = await register({
      setLoading: setSubmitting,
      payload: { ...initialFieldValues, ...submittedData },
    });
    if (status === 201) {
      warningNotificationDispatch({
        type: "SUCCESS",
        payload: { message: "successfuly registered!" },
      });
      modalDispatch({ type: "CLOSE" });
    } else if (status === 500)
      warningNotificationDispatch({ type: "WARNING", payload: { message: "server error" } });
    if (!!error) setErrors(error.message);
  };

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={createFields()}
        onSubmit={submitRegistrationForm}>
        {({ isSubmitting, isValid, errors }) => (
          <>
            <LoadingOverlay show={isSubmitting} opacity={0.5} />
            <Form>
              {Object.entries(fieldTypes).map(([fieldName, fieldType]) => (
                <Field
                  key={fieldName}
                  hasErrors={!!errors[fieldName]}
                  helperText={errors[fieldName]}
                  label={fieldName}
                  name={fieldName}
                  type={fieldType}
                  as={TextInput}
                />
              ))}
              <Button
                className="register-stage-controll-btn stage-back"
                clicked={handleGoBackStage}>
                Go back
              </Button>
              <Button className="btn-accent" disabled={!isValid} type="submit">
                Finish
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

RegisterStage2.propTypes = {
  initialFieldValues: PropTypes.object.isRequired,
  changeStage: PropTypes.func.isRequired,
};

export default RegisterStage2;
