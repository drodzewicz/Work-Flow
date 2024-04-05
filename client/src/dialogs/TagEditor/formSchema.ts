import * as Yup from "yup";

export const validationSchema = Yup.object({
    key: Yup.string().required("field is required"),
    name: Yup.string()
        .min(2, "name is too short")
        .max(20, "name is too long")
        .required("field is required"),
});
