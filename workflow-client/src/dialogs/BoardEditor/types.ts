import { InferType } from "yup";

import { validationSchema } from "./formSchema";

export type submitType = "Update" | "Create";

export interface BoardEditorProps {
  boardId?: string;
  initialValues?: {
    name: string;
    description: string;
  };
}

export interface BoardEditorFormProps {
  boardId?: string;
  submitType: submitType;
}

export interface FormValues {
  name: string;
  description: string;
}

export type BoardEditorType = InferType<typeof validationSchema>;
