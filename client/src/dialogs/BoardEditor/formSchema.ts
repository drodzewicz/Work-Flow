import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string()
    .min(5, "board name is too short")
    .max(125, "board name is too long")
    .required("name is required"),
  description: Yup.string().required("description is required").max(400, "description is too long"),
});
