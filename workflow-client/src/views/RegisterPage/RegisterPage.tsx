import React from "react";

import { OnSubmitType } from "@/types/utils";

import { TextField } from "@/components/form/TextInput";
import { Field, Form, useFormik, FormikProvider } from "formik";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { InferType } from "yup";

import axios from "@/config/api.conf.ts";

import "./RegisterPage.scss";

import { validationSchema } from "./formSchema";

export type RegisterType = InferType<typeof validationSchema>;

const INITIAL_FORM_VALUES: RegisterType = {
  username: "",
  password: "",
  matchPassword: "",
  email: "",
  name: "",
  surname: "",
};

const RegisterPage = () => {
  const navigate = useNavigate();

  const onSubmitHandler: OnSubmitType<RegisterType> = (values) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { matchPassword, ...otherData } = values;
    mutation.mutate(otherData);
  };

  const formik = useFormik({
    initialValues: INITIAL_FORM_VALUES,
    validationSchema: validationSchema,
    onSubmit: onSubmitHandler,
  });

  const mutation = useMutation(
    (registerPayload: any) => axios.post("/auth/register", registerPayload),
    {
      onError: (error: any) => {
        formik.setErrors(error?.response?.data?.messages);
      },
      onSuccess: () => {
        navigate("/#login", {
          state: { username: formik.values.username, password: formik.values.password },
        });
      },
    }
  );

  return (
    <div className="register-form">
      <FormikProvider value={formik}>
        <Form>
          <Field
            name="username"
            autoFocus={true}
            error={formik.touched.username && formik.errors?.username}
            as={TextField}
          />
          <Field
            name="password"
            type="password"
            error={formik.touched.password && formik.errors?.password}
            as={TextField}
          />
          <Field
            name="matchPassword"
            type="password"
            error={formik.touched.matchPassword && formik.errors?.matchPassword}
            as={TextField}
          />
          <Field name="email" error={formik.touched.email && formik.errors?.email} as={TextField} />
          <Field name="name" error={formik.touched.name && formik.errors?.name} as={TextField} />
          <Field
            name="surname"
            error={formik.touched.surname && formik.errors?.surname}
            as={TextField}
          />
          <button
            // disabled={props.isSubmitting || !props.isValid}
            className="btn login-form__btn"
            type="submit"
          >
            Register
          </button>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default RegisterPage;
