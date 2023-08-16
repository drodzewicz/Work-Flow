import React, { useContext } from "react";

import { OnSubmitType } from "@/types/general/utils";

import { LoginFormType } from "./types";

import { Field, Form, useFormik, FormikProvider } from "formik";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { AuthContext, AuthActionType } from "@/context/AuthContext";

import axios from "@/config/api.conf.ts";

import Button from "@/components/general/Button";
import { TextField } from "@/components/general/TextInput";

import "./Login.scss";

import { validationSchema } from "./formSchema";

const LoginForm: React.FC<{ initialValues?: Partial<LoginFormType> }> = ({ initialValues }) => {
  const { authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const mutation = useMutation(
    (loginPayload: any) => axios.post("/auth/login", loginPayload, { withCredentials: true }),
    {
      onSuccess: (response) => {
        const { user, accessToken } = response.data;
        authDispatch({ type: AuthActionType.LOGIN, payload: { user, token: accessToken } });
        navigate("/dashboard");
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
        <Button
          // disabled={props.isSubmitting || !props.isValid}
          variant="glow"
          className="login-form__btn"
          type="submit"
        >
          Log In
        </Button>
      </Form>
    </FormikProvider>
  );
};

export default LoginForm;
