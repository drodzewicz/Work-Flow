import { FormikHelpers } from "formik";

export type OnSubmitType<T> = (values: T, actions: FormikHelpers<T>) => void;
