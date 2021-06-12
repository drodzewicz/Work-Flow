export { default } from "./SimpleForm";
import { ObjectSchema } from "yup";

export interface SimpleFormProps {
  submitButtonName: string;
  validationSchema: ObjectSchema;
  handleSubmit: any;
  fields: any;
  className?: string;
  loadingOverlayColor?: {
    light: string;
    dark: string;
  };
}
