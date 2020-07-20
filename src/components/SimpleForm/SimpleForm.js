import React from "react"
import "./SimpleForm.scss";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import Button from "components/Button/Button";
import * as Yup from "yup";
import { TextField } from "@material-ui/core"

const createInitialValueObject = (fieldObject) => {
  let initialValues = {};
  Object.keys(fieldObject).forEach(fieldName => {
    initialValues[fieldName] = fieldObject[fieldName].initialVal;
  });
  return initialValues;
}

const SimpleForm = ({ title, submitButtonName, validationSchema, handleSubmit, fields }) => {
  return (
    <div className="simple-form-container">
      <h2 className="form-title">{title}</h2>
      <Formik
        validationSchema={validationSchema}
        initialValues={createInitialValueObject(fields)}
        onSubmit={handleSubmit} >
        {({ isSubmitting, isValid, errors }) => (
          <>
          {
            isSubmitting &&
            <div className="spinner-overlay">
              <img className="spinner" src="spinners/Infinity-1s-200px.svg" alt=""/>
            </div>
          }
          <Form>
            {
              Object.entries(fields).map(field => (
                <Field
                  key={field[0]}
                  error={!!errors[field[0]]}
                  helperText={errors[field[0]]}
                  label={field[0]} name={field[0]}
                  type={fields[field[0]].type}
                  as={TextField}
                />
              ))
            }
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
  )
}

SimpleForm.defaultProps = {
  title: "",
  validationSchema: Yup.object({}),
  submitButtonName: "Submit"
}

SimpleForm.propTypes = {
  submitButtonName: PropTypes.string,
  title: PropTypes.string,
  validationSchema: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
}

export default SimpleForm
