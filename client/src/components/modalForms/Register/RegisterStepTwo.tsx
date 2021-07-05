import React, { useEffect } from "react";
import { FormikProps, Form, Field, withFormik } from "formik";
import TextInput from "components/general/TextInput";
import Button from "components/general/Button";

import { RegisterStepProps, RegisterTwoFormValues, validationSchemaStepTwo } from ".";




const RegisterStage2: React.FC<RegisterStepProps & FormikProps<RegisterTwoFormValues>> = (props) => {
  const { values, errors, isSubmitting, isValid, changeStep, serverErrors, setErrors } = props;

  useEffect(() => {
    if (serverErrors) setErrors(serverErrors);
    return () => {};
  }, [serverErrors, setErrors]);

  const handleGoBackStage = () => {
    changeStep(0, values);
  };

  return (
    <Form>
      <Field
        name="email"
        hasErrors={!!errors["email"]}
        helperText={errors["email"]}
        as={TextInput}
      />
      <Field
        name="username"
        hasErrors={!!errors["username"]}
        helperText={errors["username"]}
        as={TextInput}
      />
      <Field
        name="password"
        hasErrors={!!errors["password"]}
        helperText={errors["password"]}
        type="password"
        as={TextInput}
      />
      <Field
        label="match password"
        name="matchPassword"
        hasErrors={!!errors["matchPassword"]}
        helperText={errors["matchPassword"]}
        type="password"
        as={TextInput}
      />
      <Button
        type="button"
        className="register-stage-controll-btn stage-back"
        onClick={handleGoBackStage}>
        Go back
      </Button>
      <Button
        disabled={isSubmitting || !isValid}
        variant="glow"
        className="btn-submit"
        type="submit">
        Log In
      </Button>
    </Form>
  );
};

const RegisterStage2WithFormik = withFormik<RegisterStepProps, RegisterTwoFormValues>({
  mapPropsToValues: (props) => {
    const { data } = props;
    return { ...data };
  },
  validationSchema: validationSchemaStepTwo,
  handleSubmit: async (submittedData, { props }) => {
    const { changeStep } = props;
    changeStep(1, submittedData, true);
  },
})(RegisterStage2);

export default RegisterStage2WithFormik;
