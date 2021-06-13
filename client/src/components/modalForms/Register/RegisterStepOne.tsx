import React from "react";
import { FormikProps, Form, Field, withFormik } from "formik";
import TextInput from "components/general/TextInput";
import Button from "components/general/Button";
import * as Yup from "yup";
import { RegisterStepProps, RegisterFields } from ".";

const validationSchema = Yup.object({
  name: Yup.string().max(25, "name is too long").required("field is required"),
  surname: Yup.string().max(25, "surname is too long").required("field is required"),
});
type FormValues = Pick<RegisterFields, "name" | "surname">;

const RegisterStage1: React.FC<FormikProps<FormValues>> = (props) => {
  const { errors, isValid } = props;

  return (
    <Form>
      <Field name="name" hasErrors={!!errors["name"]} helperText={errors["name"]} as={TextInput} />
      <Field
        name="surname"
        hasErrors={!!errors["surname"]}
        helperText={errors["surname"]}
        as={TextInput}
      />
      <Button className="register-stage-controll-btn stage-next" disabled={!isValid} type="submit">
        Next
      </Button>
    </Form>
  );
};

const RegisterStage1WithFormik = withFormik<RegisterStepProps, FormValues>({
  mapPropsToValues: (props) => {
    const { data } = props;
    return { ...data };
  },
  validationSchema: validationSchema,
  handleSubmit: async (submittedData, { props }) => {
    props.changeStep(1, submittedData);
  },
})(RegisterStage1);

export default RegisterStage1WithFormik;
