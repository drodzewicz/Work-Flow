import React, { useState, useContext } from "react";

import { OnSubmitType } from "@/types/general/utils";

import { RegisterType } from "./types";

import { register } from "@/service";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { AlertContext, AlertActionType } from "@/context/AlertContext";

import Button from "@/components/general/Button";
import { TextField } from "@/components/general/TextInput";

import "./Register.scss";

import { validationSchema } from "./formSchema";

const INITIAL_FORM_VALUES: RegisterType = {
  username: "",
  password: "",
  matchPassword: "",
  email: "",
  name: "",
  surname: "",
};

const Register = () => {
  const { alertDispatch } = useContext(AlertContext);
  const navigate = useNavigate();

  const onSubmitHandler: OnSubmitType<RegisterType> = async (values, { setErrors }) => {
    const { data, error } = await register({
      payload: values,
    });
    if (error) {
      alertDispatch({ type: AlertActionType.ERROR, payload: { message: "validation error" } });
      return setErrors({ ...error?.message });
    }
    if (data) {
      alertDispatch({
        type: AlertActionType.SUCCESS,
        payload: { message: data.message },
      });
      navigate("/#login", { state: values });
    }
  };
  return (
    <div className="register-form">
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
            <Field
              name="matchPassword"
              type="password"
              error={props.touched.matchPassword && props.errors.matchPassword}
              as={TextField}
            />
            <Field name="email" error={props.touched.email && props.errors.email} as={TextField} />
            <Field name="name" error={props.touched.name && props.errors.name} as={TextField} />
            <Field
              name="surname"
              error={props.touched.surname && props.errors.surname}
              as={TextField}
            />
            <Button
              // disabled={props.isSubmitting || !props.isValid}
              variant="glow"
              className="login-form__btn"
              type="submit"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
