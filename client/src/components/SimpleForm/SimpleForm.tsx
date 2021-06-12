import React from "react";
import "./SimpleForm.scss";
import { Formik, Field, Form } from "formik";
import Button from "components/general/Button/Button";
import * as Yup from "yup";
import TextInput from "components/general/TextInput";
import LoadingOverlay from "components/layout/LoadingOverlay/LoadingOverlay";
import { SimpleFormProps } from "./";

const createInitialValueObject = (fieldObject: any) => {
  let initialValues: any = {};
  Object.keys(fieldObject).forEach((fieldName) => {
    initialValues[fieldName] = fieldObject[fieldName].initialVal;
  });
  return initialValues;
};

const SimpleForm: React.FC<SimpleFormProps> = ({
  submitButtonName,
  validationSchema,
  handleSubmit,
  fields,
  className,
  loadingOverlayColor,
}) => {
  return (
    <div className={`simple-form-container ${className || ""}`}>
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

export default SimpleForm;
