import * as Yup from "yup";

export { default } from "./Login";

export const validationSchema = Yup.object({
  username: Yup.string().max(25, "username is too long").required("field is required"),
  password: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
});

export interface FormValues {
  username: string;
  password: string;
}
