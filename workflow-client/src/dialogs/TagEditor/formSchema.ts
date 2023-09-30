import * as Yup from "yup";

export const validationSchema = Yup.object({
  key: Yup.string().required("field is required"),
  name: Yup.string().required("field is required"),
});
