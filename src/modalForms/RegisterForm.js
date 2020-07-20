import React from 'react'
import * as Yup from "yup";
import SimpleForm from "components/SimpleForm/SimpleForm";

const validationSchema = Yup.object({
  username: Yup
    .string()
    .max(25, "username is too long")
    .required("field is required"),
  password: Yup
    .string()
    .min(5, "must be at least 5 characters")
    .required("field is required"),
  matchingPassword: Yup
    .string()
    .required("field is required"),
  email: Yup
    .string()
    .email()
    .required("field is required"),
  name: Yup
    .string()
    .max(25, "name is too long")
    .required("field is required"),
  surname: Yup
    .string()
    .max(25, "surname is too long")
    .required("field is required")
});

const fields = {
  username: { initialVal: "", type: "text" },
  password: { initialVal: "", type: "password" },
  matchingPassword: { initialVal: "", type: "password" },
  email: { initialVal: "", type: "email" },
  name: { initialVal: "", type: "name" },
  surname: { initialVal: "", type: "surname" },
}

const handleSubmit = (data, { setSubmitting }) => {
  setSubmitting(true);
  console.log("submited", data);
  setTimeout(() => {
    setSubmitting(false);
  }, 2000);
}

const RegisterForm = () => {
  return (
    <SimpleForm
      title="Register"
      submitButtonName="Register"
      validationSchema={validationSchema}
      handleSubmit={handleSubmit}
      fields={fields}
    />
  )
}

export default RegisterForm
