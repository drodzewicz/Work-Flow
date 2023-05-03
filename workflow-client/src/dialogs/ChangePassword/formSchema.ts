import * as Yup from "yup";

export const validationSchema = Yup.object({
  newPassword: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
  matchPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "password does not match")
    .required("Password confirm is required"),
});
