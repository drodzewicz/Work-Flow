import * as Yup from "yup";
import BoardEditor from "./BoardEditor";

export const validationSchema = Yup.object({
  name: Yup.string().max(25, "board name is too long").required("field is required"),
  description: Yup.string().max(400, "description is too long"),
});

export type submitType = "Update" | "Create";

export interface BoardEditorProps {
  boardId?: number;
  submitType?: submitType;
}

export default BoardEditor;