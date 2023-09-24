import React from "react";

import { OnSubmitType } from "@/types/utils";

import { TextField } from "@/components/form/TextInput";
import { Field, Form, useFormik, FormikProvider } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { InferType } from "yup";

import useAuth from "@/hooks/useAuth";

import { useLogin } from "@/service/auth";

import "./Login.scss";

import { validationSchema } from "./formSchema";

export type LoginFormType = InferType<typeof validationSchema>;

const LoginForm: React.FC<{ initialValues?: Partial<LoginFormType> }> = ({ initialValues }) => {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { mutate: login } = useLogin({
    onSuccess(data) {
      const { user, accessToken } = data;
      authLogin({ user, token: accessToken });

      // redirect user to the desired page if user was redirected to login
      navigate(location.state?.from?.pathname || "/dashboard");
    },
    onError() {
      formik.setErrors({ username: "bad login", password: "bad login" });
    },
  });

  const onSubmitHandler: OnSubmitType<LoginFormType> = async (values) => {
    login(values);
  };

  const INITIAL_FORM_VALUES: LoginFormType = {
    username: initialValues?.username || "",
    password: initialValues?.password || "",
  };

  const formik = useFormik({
    initialValues: INITIAL_FORM_VALUES,
    validationSchema: validationSchema,
    onSubmit: onSubmitHandler,
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <Field
          name="username"
          autoFocus={true}
          error={formik.touched.username && formik.errors.username}
          as={TextField}
        />
        <Field
          name="password"
          type="password"
          error={formik.touched.password && formik.errors.password}
          as={TextField}
        />
        <button
          // disabled={props.isSubmitting || !props.isValid}
          className="btn--glow login-form__btn"
          type="submit"
        >
          Log In
        </button>
      </Form>
    </FormikProvider>
  );
};

export default LoginForm;
