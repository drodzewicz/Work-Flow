import * as Yup from "yup";


export const validationSchema = Yup.object({
  username: Yup.string().max(25, "username is too long").required("field is required"),
  email: Yup.string().email().required("field is required"),
  name: Yup.string().max(25, "name is too long").required("field is required"),
  surname: Yup.string().max(25, "surname is too long").required("field is required"),
});

export { default } from "./ProfilePage";
