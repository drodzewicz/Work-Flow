import React, { useEffect } from "react";
import { FormikProps, Form, Field, withFormik } from "formik";
import { TextField } from "components/general/TextInput";
import Button from "components/general/Button";
import { FaBackward } from "react-icons/fa";

import { RegisterStepProps, RegisterTwoFormValues, validationSchemaStepTwo } from ".";

const RegisterStage2: React.FC<RegisterStepProps & FormikProps<RegisterTwoFormValues>> = (
  props
) => {
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
      <Button
        type="button"
        className="register-stage-controll-btn stage-back"
        onClick={handleGoBackStage}>
        <FaBackward />
        Go back
      </Button>
      <Field autoFocus={true} name="email" error={errors["email"]} as={TextField} />
      <Field name="username" error={errors["username"]} as={TextField} />
      <Field name="password" error={errors["password"]} type="password" as={TextField} />
      <Field
        label="match password"
        name="matchPassword"
        error={errors["matchPassword"]}
        type="password"
        as={TextField}
      />
      <Button
        disabled={isSubmitting || !isValid}
        variant="glow"
        className="btn-submit"
        type="submit">
        Register
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
