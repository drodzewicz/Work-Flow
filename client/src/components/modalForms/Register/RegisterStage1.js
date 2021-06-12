import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import TextInput from "components/general/TextInput";
import Button from "components/general/Button/Button";

const validationSchema = Yup.object({
    name: Yup.string().max(25, "name is too long").required("field is required"),
    surname: Yup.string().max(25, "surname is too long").required("field is required"),
});

const fieldTypes = {
    name: "text",
    surname: "text",
}

const RegisterStage1 = ({ changeFieldVals, initialFieldValues, changeStage }) => {

    const nextStage = (submittedData) => {
        changeFieldVals(submittedData);
        changeStage(2);
    }

    const createFields = () => {
        let fieldVals = {};
        Object.keys(fieldTypes).forEach(fieldName => fieldVals[fieldName] = initialFieldValues[fieldName])
        return fieldVals;
    }

    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={createFields()}
        onSubmit={nextStage}>
        {({ isValid, errors }) => (
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
              className="register-stage-controll-btn stage-next"
              disabled={!isValid}
              type="submit">
              Next
            </Button>
          </Form>
        )}
      </Formik>
    );
}

RegisterStage1.propTypes = {
    changeFieldVals: PropTypes.func.isRequired,
    initialFieldValues: PropTypes.object.isRequired,
    changeStage: PropTypes.func.isRequired
}

export default RegisterStage1;
