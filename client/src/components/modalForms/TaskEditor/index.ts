import * as Yup from "yup";

export { default } from "./TaskEditor";

type submitType = "Create" | "Update";


export interface TaskCreateProps {
  boardId: string;
  columnId: string;
}

export interface TagI {
  _id: string;
  color: string;
  name: string;
}

export interface FormValues {
  title: string;
  description: string;
  people: any[];
  tags: any[];
}

export interface newTaskUpdateProps {
  boardId: string;
  taskId: string;
}

export interface newTaskUpdate extends newTaskUpdateProps {
  initialValues: FormValues;
  submitType: submitType;
}

export interface TaskEditorFormProps {
  submitType: submitType;
  boardId: string;
}





export interface newTaskCreateProps {
  boardId: string;
  columnId: string;
}


export const validationSchema = Yup.object({
  title: Yup.string().max(100, "task title is too long").required("field is required"),
  description: Yup.string().max(500, "description is too long"),
});
