import React, { useContext, useEffect } from "react";

import { changePassword } from "@/service";
import { FormikProps, Form, Field, withFormik } from "formik";

import { ModalContext, ModalActionType } from "@/context/ModalContext";

import Button from "@/components/general/Button";
import { TextField } from "@/components/general/TextInput";

import "./ChangePassword.scss";
import { validationSchema } from "./formSchema";
import { FormValues } from "./types";

const ChangePasswordForm: React.FC<FormikProps<FormValues>> = (props) => {
  const { errors, isSubmitting, isValid, status, setErrors } = props;
  const { modalDispatch } = useContext(ModalContext);

  useEffect(() => {
    if (status?.submitStatus === "SUCCESS") {
      modalDispatch({ type: ModalActionType.CLOSE });
    } else if (status?.submitStatus === "ERROR") {
      setErrors(status?.message);
    }
  }, [status, modalDispatch, setErrors]);

  return (
    <Form className="change-password">
      <Field name="newPassword" error={errors["newPassword"]} type="password" as={TextField} />
      <Field name="matchPassword" error={errors["matchPassword"]} type="password" as={TextField} />
      <Button
        disabled={isSubmitting || !isValid}
        variant="glow"
        className="change-password__submit-btn"
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
};

const ChangePasswordWithFormik = withFormik<object, FormValues>({
  mapPropsToValues: () => {
    return { newPassword: "", matchPassword: "" };
  },
  validationSchema: validationSchema,
  handleSubmit: async (submittedData, { setSubmitting, setStatus }) => {
    const { data, error } = await changePassword({
      setLoading: setSubmitting,
      payload: submittedData,
    });
    if (data) {
      setStatus({ submitStatus: "SUCCESS" });
    } else if (error) {
      setStatus({ submitStatus: "ERROR", message: error.data.message });
    }
  },
})(ChangePasswordForm);

export default ChangePasswordWithFormik;
