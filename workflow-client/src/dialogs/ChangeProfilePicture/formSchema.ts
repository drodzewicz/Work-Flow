import * as Yup from "yup";


export const validationSchema = Yup.object({
  imageLink: Yup.string().url().required("image link is required"),
});