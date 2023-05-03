import React, { useContext, useEffect } from "react";

import { login } from "@/service";
import { FormikProps, Form, Field, withFormik } from "formik";

import { ModalContext, ModalActionType } from "@/context/ModalContext";
import { UserContext, UserActionType } from "@/context/UserContext";

import Button from "@/components/general/Button";
import { TextField } from "@/components/general/TextInput";

import "./Login.scss";
import { validationSchema } from "./formSchema";
import { FormValues } from "./types";

const LoginForm: React.FC<FormikProps<FormValues>> = (props) => {
  const { errors, isSubmitting, isValid, status, setErrors } = props;
  const { modalDispatch } = useContext(ModalContext);
  const { userDispatch } = useContext(UserContext);

  useEffect(() => {
    if (status?.submitStatus === "SUCCESS") {
      userDispatch({
        type: UserActionType.LOGIN_SUCCESS,
        payload: { user: status?.user, token: status?.token },
      });
      modalDispatch({ type: ModalActionType.CLOSE });
    } else if (status?.submitStatus === "ERROR") {
      setErrors({ ...status?.message });
    }
  }, [status, userDispatch, modalDispatch, setErrors]);

  return (
    <Form className="login-form">
      <Field autoFocus={true} name="username" error={errors["username"]} as={TextField} />
      <Field name="password" error={errors["password"]} type="password" as={TextField} />
      <Button
        disabled={isSubmitting || !isValid}
        variant="glow"
        className="login-form__btn"
        type="submit"
      >
        Log In
      </Button>
    </Form>
  );
};

const LoginWithFormik = withFormik<object, FormValues>({
  mapPropsToValues: () => {
    return { username: "", password: "" };
  },
  validationSchema: validationSchema,
  handleSubmit: async (submittedData, { setSubmitting, setStatus }) => {
    const { data, error } = await login({ setLoading: setSubmitting, payload: submittedData });
    if (data) {
      const { token, user } = data;
      setStatus({ submitStatus: "SUCCESS", token, user });
    } else if (error) {
      setStatus({ submitStatus: "ERROR", message: error.message });
    }
  },
})(LoginForm);

export default LoginWithFormik;
