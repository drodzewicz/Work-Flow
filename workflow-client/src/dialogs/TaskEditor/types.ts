import { TaskI } from "@/types/general";

type submitType = "Create" | "Update";

export interface TaskCreateProps {
  boardId: string;
  columnId: string;
}

export type FormValues = TaskI;

export interface TaskUpdateProps {
  boardId: string;
  taskId: string;
}

export interface TaskUpdateFormik extends TaskUpdateProps {
  initialValues: FormValues;
  submitType: submitType;
}

export interface TaskEditorFormProps {
  submitType: submitType;
  boardId: string;
}
