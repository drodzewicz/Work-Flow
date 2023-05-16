import React, { useContext } from "react";

import { OnSubmitType } from "@/types/general/utils";

import { LoginFormType } from "./types";

import { login } from "@/service";
import { Field, Form, Formik } from "formik";

import { UserContext, UserActionType } from "@/context/UserContext";

import Button from "@/components/general/Button";
import { TextField } from "@/components/general/TextInput";

import "./Login.scss";

import { validationSchema } from "./formSchema";

const LoginForm: React.FC<{ initialValues?: Partial<LoginFormType> }> = ({ initialValues }) => {
  const INITIAL_FORM_VALUES: LoginFormType = {
    username: initialValues?.username || "",
    password: initialValues?.password || "",
  };

  const { userDispatch } = useContext(UserContext);

  const onSubmitHandler: OnSubmitType<LoginFormType> = async (values, { setErrors }) => {
    const { data, error } = await login({ payload: values });
    if (error) {
      return setErrors({ ...error?.message });
    }
    if (data?.token) {
      userDispatch({
        type: UserActionType.LOGIN_SUCCESS,
        payload: { user: data.user, token: data.token },
      });
    }
  };

  return (
    <Formik
      initialValues={INITIAL_FORM_VALUES}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
    >
      {(props) => (
        <Form>
          <Field
            name="username"
            autoFocus={true}
            error={props.touched.username && props.errors.username}
            as={TextField}
          />
          <Field
            name="password"
            type="password"
            error={props.touched.password && props.errors.password}
            as={TextField}
          />
          <Button
            // disabled={props.isSubmitting || !props.isValid}
            variant="glow"
            className="login-form__btn"
            type="submit"
          >
            Log In
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
