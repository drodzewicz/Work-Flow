import React, { useContext, useEffect } from "react";
import { FormikProps, Form, Field, withFormik } from "formik";
import { TextField } from "components/general/TextInput";
import Button from "components/general/Button";
import { ModalContext, ModalActionType } from "context/ModalContext";
import { changePassword } from "service";
import { FormValues } from ".";
import * as Yup from "yup";
import "./ChangePassword.scss";

const validationSchema = Yup.object({
  newPassword: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
  matchPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "password does not match")
    .required("Password confirm is required"),
});

const ChangePasswordForm: React.FC<FormikProps<FormValues>> = (props) => {
  const { errors, isSubmitting, isValid, status, setErrors } = props;
  const { modalDispatch } = useContext(ModalContext);

  useEffect(() => {
    if (status?.submitStatus === "SUCCESS") {
      modalDispatch({ type: ModalActionType.CLOSE });
    } else if (status?.submitStatus === "ERROR") {
      setErrors(status?.message);
    }
    return () => {};
  }, [status, modalDispatch, setErrors]);

  return (
    <Form className="change-password">
      <Field name="newPassword" error={errors["newPassword"]} type="password" as={TextField} />
      <Field name="matchPassword" error={errors["matchPassword"]} type="password" as={TextField} />
      <Button
        disabled={isSubmitting || !isValid}
        variant="glow"
        className="change-password__submit-btn"
        type="submit">
        Submit
      </Button>
    </Form>
  );
};

const ChangePasswordWithFormik = withFormik<{}, FormValues>({
  mapPropsToValues: () => {
    return { newPassword: "", matchPassword: "" };
  },
  validationSchema: validationSchema,
  handleSubmit: async (submittedData, { setSubmitting, setStatus }) => {
    const { data, error } = await changePassword({
      setLoading: setSubmitting,
      payload: submittedData,
    });
    if (!!data) {
      setStatus({ submitStatus: "SUCCESS" });
    } else if (!!error) {
      setStatus({ submitStatus: "ERROR", message: error.data.message });
    }
  },
})(ChangePasswordForm);

export default ChangePasswordWithFormik;
