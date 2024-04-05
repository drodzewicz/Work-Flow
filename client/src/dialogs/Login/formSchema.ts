import * as Yup from "yup";

export const validationSchema = Yup.object({
    username: Yup.string().required("field is required"),
    password: Yup.string().required("field is required"),
});
