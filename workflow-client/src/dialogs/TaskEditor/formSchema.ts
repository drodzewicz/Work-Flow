import * as Yup from "yup";

export const validationSchema = Yup.object({
  title: Yup.string().max(100, "task title is too long").required("title is required"),
  description: Yup.string().max(500, "description is too long"),
});
