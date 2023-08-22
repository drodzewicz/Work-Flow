import React from "react";

import { OnSubmitType } from "@/types/utils";

import { TextField } from "@/components/form/TextInput";
import { Field, Form, useFormik, FormikProvider } from "formik";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { InferType } from "yup";

import axios from "@/config/api.conf.ts";

import useAuth from "@/hooks/useAuth";

import "./Login.scss";

import { validationSchema } from "./formSchema";

export type LoginFormType = InferType<typeof validationSchema>;

const LoginForm: React.FC<{ initialValues?: Partial<LoginFormType> }> = ({ initialValues }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const mutation = useMutation(
    (loginPayload: any) => axios.post("/auth/login", loginPayload, { withCredentials: true }),
    {
      onSuccess: (response) => {
        const { user, accessToken } = response.data;
        login({ user, token: accessToken });

        // redirect user to the desired page if user was redirected to login
        const from = location.state?.from?.pathname || "/dashboard";

        navigate(from);
      },
      onError: () => {
        formik.setErrors({ username: "bad login", password: "bad login" });
      },
    }
  );

  const onSubmitHandler: OnSubmitType<LoginFormType> = async (values) => {
    mutation.mutate(values);
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
