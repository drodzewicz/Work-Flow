import * as Yup from "yup";

export const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "username is too short")
    .max(25, "username is too long")
    .required("field is required"),
  password: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
  matchPassword: Yup.string()
    .oneOf([Yup.ref("password")], "password does not match")
    .required("Password confirm is required"),
  email: Yup.string().email().required("field is required"),
  name: Yup.string().max(25, "name is too long").required("field is required"),
  surname: Yup.string().max(25, "surname is too long").required("field is required"),
});
