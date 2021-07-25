import React from "react";
import { FormikProps, Form, Field, withFormik } from "formik";
import { TextField } from "components/general/TextInput";
import Button from "components/general/Button";
import { RegisterStepProps, RegisterOneFormValues, validationSchemaStepOne } from ".";

const RegisterStage1: React.FC<FormikProps<RegisterOneFormValues>> = (props) => {
  const { errors, isValid } = props;

  return (
    <Form>
      <Button className="register-stage-controll-btn stage-next" disabled={!isValid} type="submit">
        Next
      </Button>
      <Field autoFocus={true} name="name" error={errors["name"]} as={TextField} />
      <Field name="surname" error={errors["surname"]} as={TextField} />
    </Form>
  );
};

const RegisterStage1WithFormik = withFormik<RegisterStepProps, RegisterOneFormValues>({
  mapPropsToValues: (props) => {
    const { data } = props;
    return { ...data };
  },
  validationSchema: validationSchemaStepOne,
  handleSubmit: async (submittedData, { props }) => {
    props.changeStep(1, submittedData);
  },
})(RegisterStage1);

export default RegisterStage1WithFormik;
